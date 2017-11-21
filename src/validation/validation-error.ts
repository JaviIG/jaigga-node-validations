export class ValidationError extends Error {
    validation: any;
    constructor(validation: any) {
        super("Error while validating entity.");
        this.validation = validation;
    }
}