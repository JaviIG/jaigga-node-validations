"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_regex_1 = require("./validation/validation-regex");
/**
 * Marks a field as required, checking that its value is not undefined and its trimmed string value length is greater than 0.
 * @param msgKey An optional message key for the showed error, which defaults to 'required'.
 */
function required(msgKey) {
    return (target, propertyKey, descriptor, other, other2, other3) => {
        const value = target[propertyKey];
        if (isBlank(value))
            pushError(target, propertyKey, { "key": msgKey || 'required', "params": [propertyKey] });
    };
}
exports.required = required;
/**
 * Checks that the value is bigger than the param min.
 * @param min The minimum value allowed.
 * @param exclude If set to true, the exact min value is not allowed.
 * @param msgKey An optional message key for the showed error, which defaults to 'min-exclude' or 'min'.
 */
function min(min, exclude = false, msgKey) {
    return (target, propertyKey, descriptor) => {
        const value = target[propertyKey];
        if (!isBlank(value) && Number(value) !== NaN) {
            if (exclude) {
                if (Number(value) <= min) {
                    pushError(target, propertyKey, { "key": msgKey || 'min-exclude', "params": [propertyKey, String(min)] });
                }
            }
            else {
                if (Number(value) < min) {
                    pushError(target, propertyKey, { "key": msgKey || 'min', "params": [propertyKey, String(min)] });
                }
            }
        }
    };
}
exports.min = min;
/**
 * Checks that the value is smaller than the param max.
 * @param max The maximum value allowed.
 * @param exclude If set to true, the exact max value is not allowed.
 * @param msgKey An optional message key for the showed error, which defaults to 'max-exclude' or 'max'.
 */
function max(max, exclude = false, msgKey) {
    return (target, propertyKey, descriptor) => {
        const value = target[propertyKey];
        if (!isBlank(value) && Number(value) !== NaN) {
            if (exclude) {
                if (Number(value) >= max) {
                    pushError(target, propertyKey, { "key": msgKey || 'max-exclude', "params": [propertyKey, String(max)] });
                }
            }
            else {
                if (Number(value) > max) {
                    pushError(target, propertyKey, { "key": msgKey || 'max', "params": [propertyKey, String(max)] });
                }
            }
        }
    };
}
exports.max = max;
/**
 * Checks that an string has a length equal or bigger than the min param.
 * @param min The min value allowed;
 * @param msgKey An optional message key for the showed error, which defaults to 'min-length'.
 */
function minLength(min, msgKey) {
    return (target, propertyKey, descriptor) => {
        const value = target[propertyKey];
        if (!isBlank(value) && ("" + value).trim().length < min)
            pushError(target, propertyKey, { "key": msgKey || 'min-length', "params": [propertyKey, String(min)] });
    };
}
exports.minLength = minLength;
/**
 * Checks that an string has a length equal or smaller than the max param.
 * @param max The max value allowed;
 * @param msgKey An optional message key for the showed error, which defaults to 'max-length'.
 */
function maxLength(max, msgKey) {
    return (target, propertyKey, descriptor) => {
        const value = target[propertyKey];
        if (!isBlank(value) && ("" + value).trim().length > max)
            pushError(target, propertyKey, { "key": msgKey || 'max-length', "params": [propertyKey, String(max)] });
    };
}
exports.maxLength = maxLength;
/**
 * Checks that the value fulfills the regular expression
 * @param regex The ValidationRegex which the value must fulfill
 * @param msgKey An optional message key for the showed error, which defaults to 'regex.descriptionKey'.
 */
function hasRegex(regex, msgKey) {
    return (target, propertyKey, descriptor) => {
        const value = target[propertyKey];
        if (!isBlank(value) && !regex.regex.test(value))
            pushError(target, propertyKey, { "key": msgKey || regex.descriptionKey, "params": [propertyKey] });
    };
}
exports.hasRegex = hasRegex;
/**
 * Shortcut for @hasRegex(EMAIL_REGEX)
 * @param msgKey An optional message key for the showed error, which defaults to 'EMAIL_REGEX.descriptionKey'.
 */
function email(msgKey) {
    return hasRegex(validation_regex_1.EMAIL_REGEX, msgKey);
}
exports.email = email;
/**
 * Shortcut for @hasRegex(PHONE_REGEX)
 * @param msgKey An optional message key for the showed error, which defaults to 'PHONE_REGEX.descriptionKey'.
 */
function phone(msgKey) {
    return hasRegex(validation_regex_1.PHONE_REGEX, msgKey);
}
exports.phone = phone;
/**
 * Checks that the value is one of the specified values
 * @param allowedValues The array of valid values
 * @param msgKey An optional message key for the showed error, which defaults to 'in-values'.
 */
function inValues(allowedValues, msgKey) {
    return (target, propertyKey, descriptor) => {
        const value = target[propertyKey];
        if (!isBlank(value) && allowedValues.indexOf(value) == -1)
            pushError(target, propertyKey, { "key": msgKey || 'in-values', "params": [propertyKey] });
    };
}
exports.inValues = inValues;
function isBlank(str) {
    return typeof str === 'undefined' || String(str).trim().length === 0;
}
function pushError(entity, propertyKey, error) {
    if (!Reflect.hasOwnMetadata("errors", entity)) {
        Reflect.defineMetadata("errors", {}, entity);
    }
    const errors = Reflect.getMetadata("errors", entity);
    if (!errors[propertyKey])
        errors[propertyKey] = [];
    errors[propertyKey].push(error);
}
