import { ValidationRegex, EMAIL_REGEX, PHONE_REGEX } from "./validation/validation-regex";
import { ValidationError } from "./validation/validation-error";
import { SingleValidationError } from "./validation/single-validation-error";



/**
 * Marks a field as required, checking that its value is not undefined and its trimmed string value length is greater than 0.
 * @param msgKey An optional message key for the showed error, which defaults to 'required'.
 */
export function required(msgKey?: string): Function {
    return (target: any, key: string) => {
        pushValidation(target, key, (value: any) => {
            if (isBlank(value))
                pushError(target, key, { "key": msgKey || 'required', "params": [key] });
        })
    }
}

/**
 * Checks that the value is bigger than the param min.
 * @param min The minimum value allowed.
 * @param exclude If set to true, the exact min value is not allowed.
 * @param msgKey An optional message key for the showed error, which defaults to 'min-exclude' or 'min'.
 */
export function min(min: number, exclude: boolean = false, msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        const value = target[propertyKey];
        if (!isBlank(value) && Number(value) !== NaN) {
            if (exclude) {
                if (Number(value) <= min) {
                    pushError(target, propertyKey, { "key": msgKey || 'min-exclude', "params": [propertyKey, String(min)] });
                }
            } else {
                if (Number(value) < min) {
                    pushError(target, propertyKey, { "key": msgKey || 'min', "params": [propertyKey, String(min)] });
                }
            }
        }
    }
}

/**
 * Checks that the value is smaller than the param max.
 * @param max The maximum value allowed.
 * @param exclude If set to true, the exact max value is not allowed.
 * @param msgKey An optional message key for the showed error, which defaults to 'max-exclude' or 'max'.
 */
export function max(max: number, exclude: boolean = false, msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        const value = target[propertyKey];
        if (!isBlank(value) && Number(value) !== NaN) {
            if (exclude) {
                if (Number(value) >= max) {
                    pushError(target, propertyKey, { "key": msgKey || 'max-exclude', "params": [propertyKey, String(max)] });
                }
            } else {
                if (Number(value) > max) {
                    pushError(target, propertyKey, { "key": msgKey || 'max', "params": [propertyKey, String(max)] });
                }
            }
        }
    }
}

/**
 * Checks that an string has a length equal or bigger than the min param.
 * @param min The min value allowed;
 * @param msgKey An optional message key for the showed error, which defaults to 'min-length'.
 */
export function minLength(min: number, msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        const value = target[propertyKey];
        if (!isBlank(value) && ("" + value).trim().length < min)
            pushError(target, propertyKey, { "key": msgKey || 'min-length', "params": [propertyKey, String(min)] });
    }
}

/**
 * Checks that an string has a length equal or smaller than the max param.
 * @param max The max value allowed;
 * @param msgKey An optional message key for the showed error, which defaults to 'max-length'.
 */
export function maxLength(max: number, msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        const value = target[propertyKey];
        if (!isBlank(value) && ("" + value).trim().length > max)
            pushError(target, propertyKey, { "key": msgKey || 'max-length', "params": [propertyKey, String(max)] });
    }
}

/**
 * Checks that the value fulfills the regular expression
 * @param regex The ValidationRegex which the value must fulfill
 * @param msgKey An optional message key for the showed error, which defaults to 'regex.descriptionKey'.
 */
export function hasRegex(regex: ValidationRegex, msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        const value = target[propertyKey];
        if (!isBlank(value) && !regex.regex.test(value))
            pushError(target, propertyKey, { "key": msgKey || regex.descriptionKey, "params": [propertyKey] });
    }
}

/**
 * Shortcut for @hasRegex(EMAIL_REGEX)
 * @param msgKey An optional message key for the showed error, which defaults to 'EMAIL_REGEX.descriptionKey'.
 */
export function email(msgKey?: string): Function {
    return hasRegex(EMAIL_REGEX, msgKey);
}

/**
 * Shortcut for @hasRegex(PHONE_REGEX)
 * @param msgKey An optional message key for the showed error, which defaults to 'PHONE_REGEX.descriptionKey'.
 */
export function phone(msgKey?: string): Function {
    return hasRegex(PHONE_REGEX, msgKey);
}

/**
 * Checks that the value is one of the specified values
 * @param allowedValues The array of valid values
 * @param msgKey An optional message key for the showed error, which defaults to 'in-values'.
 */
export function inValues(allowedValues: any[], msgKey?: string): Function {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        const value = target[propertyKey];
        if (!isBlank(value) && allowedValues.indexOf(value) == -1)
            pushError(target, propertyKey, { "key": msgKey || 'in-values', "params": [propertyKey] });
    }
}

function isBlank(str: any): boolean {
    return typeof str === 'undefined' || String(str).trim().length === 0;
}

function pushError(entity: any, propertyKey: string, error: SingleValidationError) {
    if (!Reflect.hasOwnMetadata("errors", entity)) {
        Reflect.defineMetadata("errors", {}, entity);
    }

    const errors = Reflect.getMetadata("errors", entity);
    if (!errors[propertyKey])
        errors[propertyKey] = [];

    errors[propertyKey].push(error);
}

function pushValidation(target: any, key: string, validation: Function) {
    if (!Reflect.hasOwnMetadata(target, "validations")) {
        Reflect.defineMetadata("validations", [], target);
    }
    const validations = Reflect.getOwnMetadata("validations", target);
    validations.push({
        "key": key,
        "validation": validation
    });

}


