import { isNullOrUndefined } from "util";
import { AttributeDecorator, DynamicNumber } from "../types";
import { ISingleValidationError } from "./../single-validation-error";
import { mergeOptions, parseDynamicNumber, parseNumber, pushValidation } from "./util";

/**
 * Checks that the value is bigger or equal than the "min" property.
 * @param options The configuration of the decorator.
 */
export function Min(options: IMinOptions): AttributeDecorator {
    mergeOptions(MinOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any, instance: any): ISingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }

            const numValue = parseNumber(value);
            const min = parseDynamicNumber(options.min, instance);
            if (isNaN(numValue) || numValue < min) {
                return { key: options.msgKey, params: { field: propertyKey, value, min } };
            }
        });
    };
}
/**
 * Checks that the value is bigger than the "min" property.
 * @param options The configuration of the decorator.
 */
export function Greater(options: IMinOptions): AttributeDecorator {
    mergeOptions(GreaterOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any, instance: any): ISingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }

            const numValue = parseNumber(value);
            const min = parseDynamicNumber(options.min, instance);
            if (isNaN(numValue) || numValue <= min) {
                return { key: options.msgKey, params: { field: propertyKey, value, min } };
            }
        });
    };
}

/**
 * @property {DynamicNumber} min The minimum value allowed.
 * @property {boolean} [optional] If set to true, it will only validate if value is not null or undefined.
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'min-exclude' or 'min'.
 *          The params of the message are:
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "min": The minimum value allowed for the field.
 *               </pre>
 */
export interface IMinOptions {
    "min": DynamicNumber;
    "optional"?: boolean;
    "msgKey"?: string;
}
const MinOptionsDefaults: IMinOptions = {
    min: undefined,
    msgKey: "min",
    optional: false,
};
const GreaterOptionsDefaults: IMinOptions = {
    min: undefined,
    msgKey: "greater",
    optional: false,
};

/**
 * Checks that the value is smaller or equal than the "max" property.
 * @param options The configuration of the decorator.
 */
export function Max(options: IMaxOptions): AttributeDecorator {
    mergeOptions(MaxOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any, instance: any): ISingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }

            const numValue = parseNumber(value);
            const max = parseDynamicNumber(options.max, instance);
            if (isNaN(numValue) || numValue > max) {
                return { key: options.msgKey, params: { field: propertyKey, value, max } };
            }
        });
    };
}
/**
 * Checks that the value is smaller than the "max" parameter.
 * @param options The configuration of the decorator.
 */
export function Less(options: IMaxOptions): AttributeDecorator {
    mergeOptions(LessOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any, instance: any): ISingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }

            const numValue = parseNumber(value);
            const max = parseDynamicNumber(options.max, instance);
            if (isNaN(numValue) || numValue >= max) {
                return { key: options.msgKey, params: { field: propertyKey, value, max } };
            }
        });
    };
}

/**
 * @property {DynamicNumber} max The maximum value allowed.
 * @property {boolean} [optional] If set to true, it will only validate if value is not null or undefined.
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'max-exclude' or 'max'.
 *          The params of the message are:
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "max": The maximum value allowed for the field.
 *               </pre>
 */
export interface IMaxOptions {
    "max": DynamicNumber;
    "optional"?: boolean;
    "msgKey"?: string;
}
const MaxOptionsDefaults: IMaxOptions = {
    max: undefined,
    msgKey: "max",
    optional: false,
};
const LessOptionsDefaults: IMaxOptions = {
    max: undefined,
    msgKey: "less",
    optional: false,
};

/**
 * Checks that the value is inside the min and max range. Acts as a shortcut for @Min and @Max decorators.
 * @param options The configuration of the decorator.
 */
export function InRange(options: IInRangeOptions): AttributeDecorator {
    mergeOptions(InRangeOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any, instance: any): ISingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }

            const numValue = parseNumber(value);
            const min = parseDynamicNumber(options.min, instance);
            const max = parseDynamicNumber(options.max, instance);
            if (isNaN(numValue) || numValue < min || numValue > max) {
                return { key: options.msgKey, params: { field: propertyKey, value, min, max } };
            }
        });
    };
}

/**
 * @property {DynamicNumber} min The minimum value allowed.
 * @property {DynamicNumber} max The maximum value allowed.
 * @property {boolean} [optional] If set to true, it will only validate if value is not null or undefined.
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'range' or 'max'.
 *      The params of the message are:
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "min": The minimum value allowed for the field.
 *                  "max": The maximum value allowed for the field.
 *               </pre>
 */
export interface IInRangeOptions {
    "min": DynamicNumber;
    "max": DynamicNumber;
    "optional"?: boolean;
    "msgKey"?: string;
}
const InRangeOptionsDefaults: IInRangeOptions = {
    max: undefined,
    min: undefined,
    msgKey: "in-range",
    optional: false,
};
