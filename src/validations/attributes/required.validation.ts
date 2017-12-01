import { mergeOptions, pushValidation, isNullOrUndefined, isEmpty, isBlank } from "./util";
import { SingleValidationError } from './../single-validation-error';

/**
 * Checks that the value is not null or undefined.
 * @example
 *      Valid values: "a", {}, [], 0
 * @example
 *      Invalid values example: null, undefined
 * @param {NotNullOptions}[options] The configuration of the decorator.
 */
export function NotNull(options: NotNullOptions = {}): Function {
    mergeOptions(NotNullOptionsDefaults, options);
    return (target: any, propertyKey: string) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (isNullOrUndefined(value)) {
                return { "key": options.msgKey, "params": { "field": propertyKey, "value": value } };
            }
        })
    }
}
/**
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'not-null'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *               </pre>
 */
export interface NotNullOptions {
    "msgKey"?: string
}
const NotNullOptionsDefaults: NotNullOptions = {
    "msgKey": 'not-null'
}

/**
 * Checks that the value is not empty.
 * 
 * @example
 *      Valid values: null, undefined, "a", 1, {"x": ""}, [undefined]
 * @example
 *      Invalid values: "", {}, []
 * @param {NotEmptyOptions} [options] The configuration of the decorator.
 */
export function NotEmpty(options: NotEmptyOptions= {}): Function {
    mergeOptions(NotEmptyOptionsDefaults, options);
    return (target: any, propertyKey: string) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (!isNullOrUndefined(value) && isEmpty(value)) {
                return { "key": options.msgKey, "params": { "field": propertyKey, "value": value } };
            }
        })
    }
}

/**
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'not-empty'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *               </pre>
 */
export interface NotEmptyOptions {
    "msgKey"?: string
}
const NotEmptyOptionsDefaults: NotEmptyOptions = {
    "msgKey": 'not-empty'
}

/**
 * Checks that the value is not null, undefined or empty.
 * @example
 *      Valid values example: "a", 1, {"x": null}, [undefined]
 * @example
 *      Invalid values example: "", {}, [], undefined, null
 * @param {NotBlankOptions} [options] The configuration of the decorator.
 */
export function NotBlank(options: NotBlankOptions= {}): Function {
    mergeOptions(NotBlankOptionsDefaults, options);
    return (target: any, propertyKey: string) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (isBlank(value)) {
                return { "key": options.msgKey, "params": { "field": propertyKey, "value": value } };
            }
        })
    }
}

/**
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'not-blank'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *               </pre>
 */
export interface NotBlankOptions {
    "msgKey"?: string
}
const NotBlankOptionsDefaults: NotBlankOptions = {
    "msgKey": 'not-blank'
}