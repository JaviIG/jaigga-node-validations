import { mergeOptions, pushValidation, parseNumber, parseDynamicNumber } from "./util";
import { isNullOrUndefined } from "util";
import { SingleValidationError } from './../single-validation-error';

/**
 * Checks that the value is bigger or equal than the "min" property.
 * @param options The configuration of the decorator.
 */
export function Min(options: MinOptions): Function {
    mergeOptions(MinOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any, instance: any): SingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }

            const numValue = parseNumber(value);
            const min = parseDynamicNumber(options.min, instance);
            if (isNaN(numValue) || numValue < min) {
                return { "key": options.msgKey, "params": { "field": propertyKey, "value": value, "min": min } };
            }
        })
    }
}
/**
 * Checks that the value is bigger than the "min" property.
 * @param options The configuration of the decorator.
 */
export function Greater(options: MinOptions): Function {
    mergeOptions(GreaterOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any, instance: any): SingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }

            const numValue = parseNumber(value);
            const min = parseDynamicNumber(options.min, instance);
            if (isNaN(numValue) || numValue <= min) {
                return { "key": options.msgKey, "params": { "field": propertyKey, "value": value, "min": min } };
            }
        })
    }
}

/**
 * @property {number | (() => number)} min The minimum value allowed.
 * @property {boolean} [optional] If set to true, it will only validate if value is not null or undefined.
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'min-exclude' or 'min'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "min": The minimum value allowed for the field.
 *               </pre>
 */
export interface MinOptions {
    "min": number | (() => number);
    "optional"?: boolean;
    "msgKey"?: string;
}
const MinOptionsDefaults: MinOptions = {
    "min": undefined,
    "optional": false,
    "msgKey": 'min'
}
const GreaterOptionsDefaults: MinOptions = {
    "min": undefined,
    "optional": false,
    "msgKey": 'greater'
}

/**
 * Checks that the value is smaller or equal than the "max" property.
 * @param options The configuration of the decorator.
 */
export function Max(options: MaxOptions): Function {
    mergeOptions(MaxOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any, instance: any): SingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }

            const numValue = parseNumber(value);
            const max = parseDynamicNumber(options.max, instance);
            if (isNaN(numValue) || numValue > max) {
                return { "key": options.msgKey, "params": { "field": propertyKey, "value": value, "max": max } };
            }
        })
    }
}
/**
 * Checks that the value is smaller than the "max" parameter.
 * @param options The configuration of the decorator.
 */
export function Less(options: MaxOptions): Function {
    mergeOptions(LessOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any, instance: any): SingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }

            const numValue = parseNumber(value);
            const max = parseDynamicNumber(options.max, instance);
            if (isNaN(numValue) || numValue >= max) {
                return { "key": options.msgKey, "params": { "field": propertyKey, "value": value, "max": max } };
            }
        })
    }
}

/**
 * @property { number | (() => number) } max The maximum value allowed.
 * @property {boolean} [optional] If set to true, it will only validate if value is not null or undefined.
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'max-exclude' or 'max'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "max": The maximum value allowed for the field.
 *               </pre>
 */
export interface MaxOptions {
    "max": number | (() => number);
    "optional"?: boolean;
    "msgKey"?: string;
}
const MaxOptionsDefaults: MaxOptions = {
    "max": undefined,
    "optional": false,
    "msgKey": 'max'
}
const LessOptionsDefaults: MaxOptions = {
    "max": undefined,
    "optional": false,
    "msgKey": 'less'
}

/**
 * Checks that the value is inside the min and max range. Acts as a shortcut for @Min and @Max decorators.
 * @param options The configuration of the decorator.
 */
export function InRange(options: InRangeOptions): Function {
    mergeOptions(InRangeOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any, instance: any): SingleValidationError => {
            if (options.optional && isNullOrUndefined(value)) {
                return;
            }

            const numValue = parseNumber(value);
            const min = parseDynamicNumber(options.min, instance);
            const max = parseDynamicNumber(options.max, instance);
            if (isNaN(numValue) || numValue < min || numValue > max) {
                return { "key": options.msgKey, "params": { "field": propertyKey, "value": value, "min": min, "max": max } };
            }
        })
    }
}

/**
 * @property { number | (() => number)} min The minimum value allowed.
 * @property { number | (() => number)} max The maximum value allowed.
 * @property {boolean} [optional] If set to true, it will only validate if value is not null or undefined.
 * @property {string} [msgKey] An optional message key for the showed error, which defaults to 'range' or 'max'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "min": The minimum value allowed for the field.
 *                  "max": The maximum value allowed for the field.
 *               </pre>
 */
export interface InRangeOptions {
    "min": number | ((instance: any) => number);
    "max": number | ((instance: any) => number);
    "optional"?: boolean;
    "msgKey"?: string;
}
const InRangeOptionsDefaults: InRangeOptions = {
    "min": undefined,
    "max": undefined,
    "optional": false,
    "msgKey": 'in-range'
}
