import { ISingleValidationError, ValidationFunction } from "../../index";
import { VALIDATIONS } from "../variables";
export function pushValidation(clazz: any, key: string, validate: ValidationFunction) {
    if (!Reflect.hasOwnMetadata(VALIDATIONS, clazz)) {
        Reflect.defineMetadata(VALIDATIONS, [], clazz);
    }
    const validations = Reflect.getOwnMetadata(VALIDATIONS, clazz);
    validations.push({
        key,
        validate,
    });
}

export function mergeOptions(defaultConfig: any, userConfig: any): any {
    for (const key in defaultConfig) {
        if (userConfig[key] === undefined) {
            userConfig[key] = defaultConfig[key];
        }
    }
}

export function parseNumber(num: any): number {
    return num === null ? NaN : Number(num);
}
export function parseDynamicNumber(num: any, instance: any) {
    return typeof num === "function" ? num(instance) : parseNumber(num);
}

export function isNullOrUndefined(value: any): boolean {
    return value === undefined || value === null;
}

export function isEmpty(value: any): boolean {
    if (typeof value === "object") {
        return Object.keys(value).length === 0;
    } else {
        return String(value).trim().length === 0;
    }
}

export function isBlank(value: any) {
    return isNullOrUndefined(value) || isEmpty(value);
}
