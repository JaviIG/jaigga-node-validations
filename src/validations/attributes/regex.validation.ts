import { isNullOrUndefined } from "util";
import { AttributeDecorator } from "../types";
import { ISingleValidationError } from "./../single-validation-error";
import { mergeOptions, pushValidation } from "./util";

/**
 * Checks that the value matches the regular expression
 * @param options The configuration of the decorator.
 */
export function HasRegex(options: IRegexOptions): AttributeDecorator {
    mergeOptions(RegexOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): ISingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }
            if (!options.regex.test(value)) {
                return { key: options.msgKey, params: { field: propertyKey, value, regex: options.regex.toString() } };
            }
        });
    };
}
/**
 * @property {RegExp} regex The ValidationRegex which the value must fulfill
 * @property {boolean} [optional] If set to true, it will only validate if value is not null or undefined.
 * @property {boolean} [msgKey] An optional message key for the showed error, which defaults to 'regex.descriptionKey'.
 *           The params of the message are:
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "regex": The string value of the regular expression.
 *               </pre>
 */
export interface IRegexOptions {
    "regex": RegExp;
    "optional"?: boolean;
    "msgKey"?: string;
}
const RegexOptionsDefaults: IRegexOptions = {
    msgKey: "regex",
    optional: false,
    regex: undefined,
};

/**
 * Shortcut for {@link @hasRegex(EMAIL_REGEX)}
 * @param options The configuration of the decorator.
 */
export function Email(options: IRegexOptions = {} as any): AttributeDecorator {
    mergeOptions(EmailOptionsDefaults, options);
    return HasRegex(options);
}

// tslint:disable-next-line:max-line-length
export const EMAIL_REGEX: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EmailOptionsDefaults: IRegexOptions = {
    msgKey: "regex-email",
    optional: false,
    regex: EMAIL_REGEX,
};
