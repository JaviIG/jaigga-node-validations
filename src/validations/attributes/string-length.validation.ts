import { mergeOptions, pushValidation } from "./util";
import { isNullOrUndefined } from "util";
import { SingleValidationError } from './../single-validation-error';

/**
 * Checks that the is string length equal or bigger than the min parameter.
 * @param options The configuration of the decorator.
 */
export function MinLength(options: MinLengthOptions): Function {
    mergeOptions(MinLengthOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }
            if (isNullOrUndefined(value) || String(value).trim().length < options.min) {
                return { "key": options.msgKey, "params": { "field": propertyKey, "value": value, "min-length": options.min } };
            }
        })
    }
}
/**
 * @property {number} min The min value allowed
 * @property {boolean} [optional] If set to true, it will only validate if value is not null or undefined.
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'min-length'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "min-length": The minimum length allowed for the value.
 *               </pre>
 */
export interface MinLengthOptions {
    "min": number;
    "optional"?: boolean;
    "msgKey"?: string;
}
const MinLengthOptionsDefaults: MinLengthOptions = {
    "min": undefined,
    "optional": false,
    "msgKey": 'min-length'
}
/**
 * Checks that the string length is length equal or smaller than the max parameter.
 * @param options The configuration of the decorator.
 */
export function MaxLength(options: MaxLengthOptions): Function {
    mergeOptions(MaxLengthOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }
            if (isNullOrUndefined(value) || String(value).trim().length > options.max) {
                return { "key": options.msgKey, "params": { "field": propertyKey, "value": value, "max-length": options.max } };
            }
        })
    }
}
/**
 * @property {number} max The max value allowed;
 * @property {boolean} [optional] If set to true, it will only validate if value is not null or undefined.
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'max-length'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "max-length": The maximum length allowed for the field.
 *               </pre>
 */
export interface MaxLengthOptions {
    "max": number;
    "optional"?: boolean;
    "msgKey"?: string;
}
const MaxLengthOptionsDefaults: MaxLengthOptions = {
    "max": undefined,
    "optional": false,
    "msgKey": 'max-length'
}