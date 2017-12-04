import { SingleValidationError } from "./single-validation-error";
export type ValidationFunction = (value: any, instance: any) => SingleValidationError;
export interface Validation {
    key: string;
    validate: ValidationFunction;
}