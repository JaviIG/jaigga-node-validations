export class ValidationError extends Error {
    errors: any;
    constructor(errors: any) {
        super("Error while validating entity.");
        this.errors = errors;
    }
}