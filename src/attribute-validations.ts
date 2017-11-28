import { ERRORS, VALIDATIONS } from './variables';
import { ValidationRegex, EMAIL_REGEX } from "./validation/validation-regex";
import { ValidationError } from "./validation/validation-error";
import { SingleValidationError } from "./validation/single-validation-error";
import { isEmpty, isNullOrUndefined, isBlank } from './validation-functions';



/**
 * Checks that the value is not null or undefined.
 *      Valid values example: "a", {}, [], 0, null
 *      Invalid values example: null, undefined
 * @param msgKey An optional message key for the showed error, which defaults to 'not-null'. The message has this params: {0} => propertyKey
 */
export function notNull(msgKey?: string): Function {
    return (target: any, propertyKey: string) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (isNullOrUndefined(value)) {
                return { "key": msgKey || 'not-null', "params": [propertyKey] };
            }
        })
    }
}

/**
 * Checks that the value is null/undefined or not empty. 
 *      Valid values example: null, undefined, "a", 1, {"x": ""}, [undefined]
 *      Invalid values example: "", {}, []
 * @param msgKey An optional message key for the showed error, which defaults to 'not-empty'. The message has this params: {0} => propertyKey
 */
export function notEmpty(msgKey?: string): Function {
    return (target: any, propertyKey: string) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (!isNullOrUndefined(value) && isEmpty(value)) {
                return { "key": msgKey || 'not-empty', "params": [propertyKey] };
            }
        })
    }
}

/**
 * Checks that the value is not null,undefined or empty.
 *      Valid values example: "a", 1, {"x": null}, [undefined]
 *      Invalid values example: "", {}, [], undefined, null
 * @param msgKey An optional message key for the showed error, which defaults to 'not-blank'. The message has this params: {0} => propertyKey
 */
export function notBlank(msgKey?: string): Function {
    return (target: any, propertyKey: string) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (isBlank(value)) {
                return { "key": msgKey || 'not-blank', "params": [propertyKey] };
            }
        })
    }
}

/**
 * Checks that the value is bigger than the param min.
 * @param min The minimum value allowed.
 * @param exclude If set to true, the exact min value is not allowed.
 * @param optional If set to true, it will only validate if value is not null or undefined.
 * @param msgKey An optional message key for the showed error, which defaults to 'min-exclude' or 'min'.
 */
export function min(min: number, exclude: boolean = false, optional: boolean = false, msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (optional && isNullOrUndefined(value)) {
                return;
            }
            if (value === null)
                value = undefined;
            const numValue = Number(value);
            if (exclude) {
                if (isNaN(numValue) || numValue <= min) {
                    return { "key": msgKey || 'min-exclude', "params": [propertyKey, String(min)] };
                }
            } else {
                if (isNaN(numValue) || numValue < min) {
                    return { "key": msgKey || 'min', "params": [propertyKey, String(min)] };
                }
            }

        })
    }
}

/**
 * Checks that the value is smaller than the param max.
 * @param max The maximum value allowed.
 * @param optional If set to true, it will only validate if value is not null or undefined.
 * @param exclude If set to true, the exact max value is not allowed.
 * @param msgKey An optional message key for the showed error, which defaults to 'max-exclude' or 'max'.
 */
export function max(max: number, exclude: boolean = false, optional: boolean = false, msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (optional && isNullOrUndefined(value)) {
                return;
            }
            if (value === null)
                value = undefined;
            const numValue = Number(value);
            if (exclude) {
                if (isNaN(numValue) || numValue >= max) {
                    return { "key": msgKey || 'max-exclude', "params": [propertyKey, String(max)] };
                }
            } else {
                if (isNaN(numValue) || numValue > max) {
                    return { "key": msgKey || 'max', "params": [propertyKey, String(max)] };
                }
            }
        })
    }
}

/**
 * Checks that an string has a trimmed length equal or bigger than the min param.
 * @param min The min value allowed
 * @param optional If set to true, it will only validate if value is not null or undefined.
 * @param msgKey An optional message key for the showed error, which defaults to 'min-length'.
 */
export function minLength(min: number, optional: boolean = false, msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (optional && isNullOrUndefined(value)) {
                return;
            }
            if (isNullOrUndefined(value) || String(value).trim().length < min) {
                return { "key": msgKey || 'min-length', "params": [propertyKey, String(min)] };
            }
        })
    }
}

/**
 * Checks that an string has a trimmed length equal or smaller than the max param.
 * @param max The max value allowed;
 * @param optional If set to true, it will only validate if value is not null or undefined.
 * @param msgKey An optional message key for the showed error, which defaults to 'max-length'.
 */
export function maxLength(max: number, optional: boolean = false, msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (optional && isNullOrUndefined(value)) {
                return;
            }
            if (isNullOrUndefined(value) || String(value).trim().length > max) {
                return { "key": msgKey || 'max-length', "params": [propertyKey, String(max)] };
            }
        })
    }
}

/**
 * Checks that the value fulfills the regular expression
 * @param regex The ValidationRegex which the value must fulfill
 * @param optional If set to true, it will only validate if value is not null or undefined.
 * @param msgKey An optional message key for the showed error, which defaults to 'regex.descriptionKey'.
 */
export function hasRegex(regex: ValidationRegex, optional: boolean = false, msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (optional && isNullOrUndefined(value)) {
                return;
            }
            if (!regex.regex.test(value)) {
                return { "key": msgKey || regex.descriptionKey, "params": [propertyKey] };
            }
        })
    }
}

/**
 * Shortcut for @hasRegex(EMAIL_REGEX)
 * @param optional If set to true, it will only validate if value is not null or undefined.
 * @param msgKey An optional message key for the showed error, which defaults to 'EMAIL_REGEX.descriptionKey'.
 */
export function email(optional: boolean = false, msgKey?: string): Function {
    return hasRegex(EMAIL_REGEX, optional, msgKey);
}

/**
 * Checks that the value is one of the specified values
 * @param allowedValues The array of valid values
 * @param optional If set to true, it will only validate if value is not null or undefined.
 * @param msgKey An optional message key for the showed error, which defaults to 'in-values'.
 */
export function inValues(allowedValues: any[], msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (!isBlank(value) && allowedValues.indexOf(value) == -1)
                return { "key": msgKey || 'in-values', "params": [propertyKey] };
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


