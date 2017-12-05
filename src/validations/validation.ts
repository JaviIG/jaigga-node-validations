import { ISingleValidationError } from "./single-validation-error";
export type ValidationFunction = (value: any, instance: any) => ISingleValidationError;
export interface IValidation {
    key: string;
    validate: ValidationFunction;
}
