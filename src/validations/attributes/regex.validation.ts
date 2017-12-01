import { mergeOptions, pushValidation } from "./util";
import { isNullOrUndefined } from "util";
import { SingleValidationError } from './../single-validation-error';

/**
 * Checks that the value matches the regular expression
 * @param options The configuration of the decorator.
 */
export function HasRegex(options: RegexOptions): Function {
    mergeOptions(RegexOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }
            if (!options.regex.test(value)) {
                return { "key": options.msgKey, "params": { "field": propertyKey, "value": value, "regex": options.regex.toString() } };
            }
        })
    }
}
/**
 * @property {RegExp} regex The ValidationRegex which the value must fulfill
 * @property {boolean} [optional] If set to true, it will only validate if value is not null or undefined.
 * @property {boolean} [msgKey] An optional message key for the showed error, which defaults to 'regex.descriptionKey'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "regex": The string value of the regular expression.
 *               </pre>
 */
export interface RegexOptions {
    "regex": RegExp
    "optional"?: boolean,
    "msgKey"?: string
}
const RegexOptionsDefaults: RegexOptions = {
    "regex": undefined,
    "optional": false,
    "msgKey": 'regex'
}

/**
 * Shortcut for {@link @hasRegex(EMAIL_REGEX)}
 * @param options The configuration of the decorator.
 */
export function Email(options: RegexOptions = {} as any): Function {
    mergeOptions(EmailOptionsDefaults, options);
    return HasRegex(options);
}

export const EMAIL_REGEX: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EmailOptionsDefaults: RegexOptions = {
    "regex": EMAIL_REGEX,
    "optional": false,
    "msgKey": 'regex-email'
}