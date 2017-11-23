import { ValidationError } from "./validation/validation-error";
import { VALIDATIONS, VALID, ERRORS } from "./variables";
import { SingleValidationError } from "./validation/single-validation-error";
import { Validation } from "./validation/validation";

export function valid(): Function {
    return (target: any, key: string, index: number) => {
        if (!Reflect.hasOwnMetadata(VALID, target, key)) {
            Reflect.defineMetadata(VALID, [], target, key);
        }
        const validParameters = Reflect.getOwnMetadata(VALID, target, key);
        validParameters.push(index);

    }
}

export function validate(): Function {
    return (clazz: any, key: string, descriptor: TypedPropertyDescriptor<Function>) => {
        const method = descriptor.value;
        descriptor.value = function () {
            const parametersToValidate: number[] = Reflect.getOwnMetadata(VALID, clazz, key);
            if (parametersToValidate) {
                for (let index of parametersToValidate) {
                    const entity = arguments[index];
                    Reflect.defineMetadata(ERRORS, {}, entity);
                    const validations: any[] = Reflect.getMetadata(VALIDATIONS, entity);
                    if (validations !== undefined) {
                        validations.forEach((validation) => { doValidation(validation, entity) });
                    }
                    if (Reflect.hasOwnMetadata(ERRORS, entity)) {
                        throw new ValidationError(Reflect.getOwnMetadata(ERRORS, entity));
                    }
                }
            }
            return method.apply(this, arguments);
        }
    }
}
function doValidation(validation: Validation, entity: any) {
    const error = validation.validate(entity[validation.key]);
    if (error != undefined) {
        const errors = Reflect.getMetadata(ERRORS, entity);
        if (errors[validation.key] === undefined) {
            errors[validation.key] = []
        }
        errors[validation.key].push(error);
    }
}
function pushError(entity: any, propertyKey: string, error: SingleValidationError) {
    const errors = Reflect.getMetadata(ERRORS, entity);
    if (!errors[propertyKey])
        errors[propertyKey] = [];

    errors[propertyKey].push(error);
}