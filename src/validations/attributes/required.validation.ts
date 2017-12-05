import { AttributeDecorator } from "../types";
import { ISingleValidationError } from "./../single-validation-error";
import { isBlank, isEmpty, isNullOrUndefined, mergeOptions, pushValidation } from "./util";

/**
 * Checks that the value is not null or undefined.
 * @example
 *      Valid values: "a", {}, [], 0
 * @example
 *      Invalid values example: null, undefined
 * @param {INotNullOptions}[options] The configuration of the decorator.
 */
export function NotNull(options: INotNullOptions = {}): AttributeDecorator {
    mergeOptions(NotNullOptionsDefaults, options);
    return (target: any, propertyKey: string) => {
        pushValidation(target, propertyKey, (value: any): ISingleValidationError => {
            if (isNullOrUndefined(value)) {
                return { key: options.msgKey, params: { field: propertyKey, value } };
            }
        });
    };
}
/**
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'not-null'. The params of the message are:
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *               </pre>
 */
export interface INotNullOptions {
    "msgKey"?: string;
}
const NotNullOptionsDefaults: INotNullOptions = {
    msgKey: "not-null",
};

/**
 * Checks that the value is not empty.
 *
 * @example
 *      Valid values: null, undefined, "a", 1, {"x": ""}, [undefined]
 * @example
 *      Invalid values: "", {}, []
 * @param {INotEmptyOptions} [options] The configuration of the decorator.
 */
export function NotEmpty(options: INotEmptyOptions= {}): AttributeDecorator {
    mergeOptions(NotEmptyOptionsDefaults, options);
    return (target: any, propertyKey: string) => {
        pushValidation(target, propertyKey, (value: any): ISingleValidationError => {
            if (!isNullOrUndefined(value) && isEmpty(value)) {
                return { key: options.msgKey, params: { field: propertyKey, value } };
            }
        });
    };
}

/**
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'not-empty'. The params of the message are:
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *               </pre>
 */
export interface INotEmptyOptions {
    "msgKey"?: string;
}
const NotEmptyOptionsDefaults: INotEmptyOptions = {
    msgKey: "not-empty",
};

/**
 * Checks that the value is not null, undefined or empty.
 * @example
 *      Valid values example: "a", 1, {"x": null}, [undefined]
 * @example
 *      Invalid values example: "", {}, [], undefined, null
 * @param {INotBlankOptions} [options] The configuration of the decorator.
 */
export function NotBlank(options: INotBlankOptions= {}): AttributeDecorator {
    mergeOptions(NotBlankOptionsDefaults, options);
    return (target: any, propertyKey: string) => {
        pushValidation(target, propertyKey, (value: any): ISingleValidationError => {
            if (isBlank(value)) {
                return { key: options.msgKey, params: { field: propertyKey, value } };
            }
        });
    };
}

/**
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'not-blank'. The params of the message are:
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *               </pre>
 */
export interface INotBlankOptions {
    "msgKey"?: string;
}
const NotBlankOptionsDefaults: INotBlankOptions = {
    msgKey: "not-blank",
};
