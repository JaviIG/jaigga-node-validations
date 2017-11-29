import { SingleValidationError } from "./single-validation-error";

export interface Validation {
    key: string;
    validate: (value: any) => SingleValidationError;
}