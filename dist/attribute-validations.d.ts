import { ValidationRegex } from "./validation/validation-regex";
/**
 * Marks a field as required, checking that its value is not undefined and its trimmed string value length is greater than 0.
 * @param msgKey An optional message key for the showed error, which defaults to 'required'.
 */
export declare function required(msgKey?: string): Function;
/**
 * Checks that the value is bigger than the param min.
 * @param min The minimum value allowed.
 * @param exclude If set to true, the exact min value is not allowed.
 * @param msgKey An optional message key for the showed error, which defaults to 'min-exclude' or 'min'.
 */
export declare function min(min: number, exclude?: boolean, msgKey?: string): Function;
/**
 * Checks that the value is smaller than the param max.
 * @param max The maximum value allowed.
 * @param exclude If set to true, the exact max value is not allowed.
 * @param msgKey An optional message key for the showed error, which defaults to 'max-exclude' or 'max'.
 */
export declare function max(max: number, exclude?: boolean, msgKey?: string): Function;
/**
 * Checks that an string has a length equal or bigger than the min param.
 * @param min The min value allowed;
 * @param msgKey An optional message key for the showed error, which defaults to 'min-length'.
 */
export declare function minLength(min: number, msgKey?: string): Function;
/**
 * Checks that an string has a length equal or smaller than the max param.
 * @param max The max value allowed;
 * @param msgKey An optional message key for the showed error, which defaults to 'max-length'.
 */
export declare function maxLength(max: number, msgKey?: string): Function;
/**
 * Checks that the value fulfills the regular expression
 * @param regex The ValidationRegex which the value must fulfill
 * @param msgKey An optional message key for the showed error, which defaults to 'regex.descriptionKey'.
 */
export declare function hasRegex(regex: ValidationRegex, msgKey?: string): Function;
/**
 * Shortcut for @hasRegex(EMAIL_REGEX)
 * @param msgKey An optional message key for the showed error, which defaults to 'EMAIL_REGEX.descriptionKey'.
 */
export declare function email(msgKey?: string): Function;
/**
 * Shortcut for @hasRegex(PHONE_REGEX)
 * @param msgKey An optional message key for the showed error, which defaults to 'PHONE_REGEX.descriptionKey'.
 */
export declare function phone(msgKey?: string): Function;
/**
 * Checks that the value is one of the specified values
 * @param allowedValues The array of valid values
 * @param msgKey An optional message key for the showed error, which defaults to 'in-values'.
 */
export declare function inValues(allowedValues: any[], msgKey?: string): Function;
