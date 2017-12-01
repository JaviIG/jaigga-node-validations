import { SingleValidationError } from './../single-validation-error';
import { mergeOptions, pushValidation } from "./util";
import { isNullOrUndefined } from "util";
import equal = require('deep-equal');

/**
 * Checks that the value is one of the specified values
 * @param options The configuration of the decorator.
 */
export function InValues(options: InValuesOptions): Function {
    mergeOptions(InValuesOptionsDefaults, options);
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        pushValidation(target, propertyKey, (value: any): SingleValidationError => {
            const result = options.allowedValues.findIndex((element) => {
                if (!isNullOrUndefined(value) && typeof element === 'object') {
                    return equal(value, element);
                } else {
                    return element === value;
                }
            })
            if (result === -1)
                return { "key": options.msgKey, "params": { "field": propertyKey, "value": value, "allowed-values": options.allowedValues } };
        })
    }
}

/**
 * @property {any[]} allowedValues The array of valid values
 * @property {boolean} [optional] If set to true, it will only validate if value is not null or undefined.
 * @property {boolean} [msgKey] An optional message key for the showed error, which defaults to 'in-values'. The params of the message are: 
 *               <pre>
 *                  "field": The name of the field to validate.
 *                  "value": The value of the field.
 *                  "allowed-values": The array of allowed values.
 *               </pre>
 */
export interface InValuesOptions {
    "allowedValues": any[]
    "optional"?: boolean,
    "msgKey"?: string
}
const InValuesOptionsDefaults: InValuesOptions = {
    "allowedValues": undefined,
    "optional": false,
    "msgKey": 'in-values'
}