import { ERRORS, VALIDATIONS } from './util/variables';
import { ValidationRegex, EMAIL_REGEX } from "./util/validation-regex";
import { ValidationError } from "./util/validation-error";
import { SingleValidationError } from "./util/single-validation-error";
import { isEmpty, isNullOrUndefined, isBlank } from './util/validation-functions';
import equal = require('deep-equal')


/**
 * Checks that the value is not null or undefined.
 * @example
 *      Valid values: "a", {}, [], 0
 * @example
 *      Invalid values example: null, undefined
 * @param msgKey An optional message key for the showed error, which defaults to 'not-null'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *               </pre>
 */
export function notNull(msgKey?: string): Function {
    return (target: any, propertyKey: string) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (isNullOrUndefined(value)) {
                return { "key": msgKey || 'not-null', "params": { "field": propertyKey, "value": value } };
            }
        })
    }
}

/**
 * Checks that the value is not empty.
 * 
 * @example
 *      Valid values: null, undefined, "a", 1, {"x": ""}, [undefined]
 * @example
 *      Invalid values: "", {}, []
 * @param msgKey An optional message key for the showed error, which defaults to 'not-empty'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *               </pre>
 */
export function notEmpty(msgKey?: string): Function {
    return (target: any, propertyKey: string) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (!isNullOrUndefined(value) && isEmpty(value)) {
                return { "key": msgKey || 'not-empty', "params": { "field": propertyKey, "value": value } };
            }
        })
    }
}

/**
 * Checks that the value is not null, undefined or empty.
 * @example
 *      Valid values example: "a", 1, {"x": null}, [undefined]
 * @example
 *      Invalid values example: "", {}, [], undefined, null
 * @param msgKey An optional message key for the showed error, which defaults to 'not-blank'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *               </pre>
 */
export function notBlank(msgKey?: string): Function {
    return (target: any, propertyKey: string) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (isBlank(value)) {
                return { "key": msgKey || 'not-blank', "params": { "field": propertyKey, "value": value } };
            }
        })
    }
}

/**
 * Checks that the value is bigger than the "min" parameter.
 * @param min The minimum value allowed.
 * @param exclude If set to true, the exact min value is not allowed.
 * @param optional If set to true, it will only validate if value is not null or undefined.
 * @param msgKey An optional message key for the showed error, which defaults to 'min-exclude' or 'min'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "min": The minimum value allowed for the field.
 *               </pre>
 */
export function min(min: number, exclude: boolean = false, optional: boolean = false, msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (optional && isNullOrUndefined(value)) {
                return;
            }

            let numValue;
            if (value === null) {
                numValue = Number(undefined);
            } else {
                numValue = Number(value);
            }

            if (exclude) {
                if (isNaN(numValue) || numValue <= min) {
                    return { "key": msgKey || 'min-exclude', "params": { "field": propertyKey, "value": value, "min": min } };
                }
            } else {
                if (isNaN(numValue) || numValue < min) {
                    return { "key": msgKey || 'min', "params": { "field": propertyKey, "value": value, "min": min } };
                }
            }

        })
    }
}

/**
 * Checks that the value is smaller than the "max" parameter.
 * @param max The maximum value allowed.
 * @param optional If set to true, it will only validate if value is not null or undefined.
 * @param exclude If set to true, the exact max value is not allowed.
 * @param msgKey An optional message key for the showed error, which defaults to 'max-exclude' or 'max'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "max": The maximum value allowed for the field.
 *               </pre>
 */
export function max(max: number, exclude: boolean = false, optional: boolean = false, msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (optional && isNullOrUndefined(value)) {
                return;
            }

            let numValue;
            if (value === null) {
                numValue = Number(undefined);
            } else {
                numValue = Number(value);
            }

            if (exclude) {
                if (isNaN(numValue) || numValue >= max) {
                    return { "key": msgKey || 'max-exclude', "params": { "field": propertyKey, "value": value, "max": max } };
                }
            } else {
                if (isNaN(numValue) || numValue > max) {
                    return { "key": msgKey || 'max', "params": { "field": propertyKey, "value": value, "max": max } };
                }
            }
        })
    }
}

/**
 * Checks that an string has a trimmed length equal or bigger than the min param.
 * @param min The min value allowed
 * @param optional If set to true, it will only validate if value is not null or undefined.
 * @param msgKey An optional message key for the showed error, which defaults to 'min-length'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "min-length": The minimum length allowed for the value.
 *               </pre>
 */
export function minLength(min: number, optional: boolean = false, msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (optional && isNullOrUndefined(value)) {
                return;
            }
            if (isNullOrUndefined(value) || String(value).trim().length < min) {
                return { "key": msgKey || 'min-length', "params": { "field": propertyKey, "value": value, "min-length": min } };
            }
        })
    }
}

/**
 * Checks that an string has a trimmed length equal or smaller than the max param.
 * @param max The max value allowed;
 * @param optional If set to true, it will only validate if value is not null or undefined.
 * @param msgKey An optional message key for the showed error, which defaults to 'max-length'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "max-length": The maximum length allowed for the field.
 *               </pre>
 */
export function maxLength(max: number, optional: boolean = false, msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (optional && isNullOrUndefined(value)) {
                return;
            }
            if (isNullOrUndefined(value) || String(value).trim().length > max) {
                return { "key": msgKey || 'max-length', "params": { "field": propertyKey, "value": value, "max-length": max } };
            }
        })
    }
}

/**
 * Checks that the value fulfills the regular expression
 * @param regex The ValidationRegex which the value must fulfill
 * @param optional If set to true, it will only validate if value is not null or undefined.
 * @param msgKey An optional message key for the showed error, which defaults to 'regex.descriptionKey'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "regex": The string value of the regular expression.
 *               </pre>
 */
export function hasRegex(regex: ValidationRegex, optional: boolean = false, msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (optional && isNullOrUndefined(value)) {
                return;
            }
            if (!regex.regex.test(value)) {
                return { "key": msgKey || regex.descriptionKey, "params": { "field": propertyKey, "value": value, "regex": regex.regex.toString() } };
            }
        })
    }
}

/**
 * Shortcut for {@link @hasRegex(EMAIL_REGEX)}
 * @param optional If set to true, it will only validate if value is not null or undefined.
 * @param msgKey An optional message key for the showed error, which defaults to 'EMAIL_REGEX.descriptionKey'.
 * . The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "regex": The string value of the regular expression.
 *               </pre>
 */
export function email(optional: boolean = false, msgKey?: string): Function {
    return hasRegex(EMAIL_REGEX, optional, msgKey);
}

/**
 * Checks that the value is one of the specified values
 * @param allowedValues The array of valid values
 * @param optional If set to true, it will only validate if value is not null or undefined.
 * @param msgKey An optional message key for the showed error, which defaults to 'in-values'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "allowed-values": The array of allowed values.
 *               </pre>
 */
export function inValues(allowedValues: any[], msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            const result = allowedValues.findIndex((element) => {
                if (!isNullOrUndefined(value) && typeof element === 'object') {
                    return equal(value, element);
                } else {
                    return element === value;
                }
            })
            if (result === -1)
                return { "key": msgKey || 'in-values', "params": { "field": propertyKey, "value": value, "allowed-values": allowedValues } };
        })
    }
}

function pushValidation(clazz: any, key: string, validation: Function) {
    if (!Reflect.hasOwnMetadata(VALIDATIONS, clazz)) {
        Reflect.defineMetadata(VALIDATIONS, [], clazz);
    }
    const validations = Reflect.getOwnMetadata(VALIDATIONS, clazz);
    validations.push({
        "key": key,
        "validate": validation
    });
}


