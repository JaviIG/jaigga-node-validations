import { isNullOrUndefined } from "util";
import { AttributeDecorator } from "../types";
import { ISingleValidationError } from "./../single-validation-error";
import { mergeOptions, parseDynamicNumber, parseNumber, pushValidation } from "./util";

/**
 * Checks that the is string length is equal or bigger than the min parameter.
 * @param options The configuration of the decorator.
 */
export function MinLength(options: IMinLengthOptions): AttributeDecorator {
    mergeOptions(MinLengthOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any, instance: any): ISingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }

            const length = options.trim ? String(value).trim().length : String(value).length;
            const min = parseDynamicNumber(options.min, instance);
            if (isNullOrUndefined(value) || length < min) {
                return { key: options.msgKey, params: { "field": propertyKey, "value": value, "min-length": min } };
            }
        });
    };
}
/**
 * @property {number| ((instance) => number)} min The min value allowed
 * @property {boolean} [trim] If set to true the string value will be trimmed before comparing its length.
 * @property {boolean} [optional] If set to true, it will only validate if value is not null or undefined.
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'min-length'. The params of the message are:
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "min-length": The minimum length allowed for the value.
 *               </pre>
 */
export interface IMinLengthOptions {
    "min": number | ((instance) => number);
    "trim"?: boolean;
    "optional"?: boolean;
    "msgKey"?: string;
}
const MinLengthOptionsDefaults: IMinLengthOptions = {
    min: undefined,
    msgKey: "min-length",
    optional: false,
    trim: false,
};
/**
 * Checks that the string length is equal or smaller than the max parameter.
 * @param options The configuration of the decorator.
 */
export function MaxLength(options: IMaxLengthOptions): AttributeDecorator {
    mergeOptions(MaxLengthOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any, instance: any): ISingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }

            const length = options.trim ? String(value).trim().length : String(value).length;
            const max = parseDynamicNumber(options.max, instance);
            if (isNullOrUndefined(value) || length > max) {
                return { key: options.msgKey, params: { "field": propertyKey, "value": value, "max-length": max } };
            }
        });
    };
}
/**
 * @property {number | ((instance) => number)} max The max value allowed;
 * @property {boolean} [trim] If set to true the string value will be trimmed before comparing its length.
 * @property {boolean} [optional] If set to true, it will only validate if value is not null or undefined.
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'max-length'. The params of the message are:
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "max-length": The maximum length allowed for the field.
 *               </pre>
 */
export interface IMaxLengthOptions {
    "max": number | ((instance) => number);
    "trim"?: boolean;
    "optional"?: boolean;
    "msgKey"?: string;
}
const MaxLengthOptionsDefaults: IMaxLengthOptions = {
    max: undefined,
    msgKey: "max-length",
    optional: false,
    trim: false,
};

/**
 * Checks that the string length is between the range of the min and max parameters.
 * @param options The configuration of the decorator.
 */
export function InLengthRange(options: IInLengthRangeOptions): AttributeDecorator {
    mergeOptions(InLengthRangeOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any, instance: any): ISingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }

            const length = options.trim ? String(value).trim().length : String(value).length;
            const min = parseDynamicNumber(options.min, instance);
            const max = parseDynamicNumber(options.max, instance);
            if (isNullOrUndefined(value) || length < min || length > max) {
                return { key: options.msgKey, params: { "field": propertyKey, "value": value, "min-length": min, "max-length": max } };
            }
        });
    };
}
/**
 * @property {number | ((instance) => number)} min The minimum value allowed;
 * @property {number | ((instance) => number)} max The maximum value allowed;
 * @property {boolean} [trim] If set to true the string value will be trimmed before comparing its length.
 * @property {boolean} [optional] If set to true, it will only validate if value is not null or undefined.
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'length-range'.
 *          The params of the message are:
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                   "min-length": The minimum length allowed for the field.
 *                  "max-length": The maximum length allowed for the field.
 *               </pre>
 */
export interface IInLengthRangeOptions {
    "min": number | ((instance) => number);
    "max": number | ((instance) => number);
    "trim"?: boolean;
    "optional"?: boolean;
    "msgKey"?: string;
}
const InLengthRangeOptionsDefaults: IInLengthRangeOptions = {
    max: undefined,
    min: undefined,
    msgKey: "in-length-range",
    optional: false,
    trim: false,
};
