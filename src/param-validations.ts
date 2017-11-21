import { ValidationError } from "./validation/validation-error";

export function valid() {
    return (target: any, key: string) => {
        const validations: Function[] = Reflect.getOwnMetadata("validations", target);
        validations.forEach((v) => v(target[key]));

        if (Reflect.hasOwnMetadata("errors", target)) {
            throw new ValidationError(Reflect.getOwnMetadata("errors", target));
        }
    }
}