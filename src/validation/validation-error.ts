export class ValidationError extends Error {
    errors: any;
    constructor(errors: any) {
        super("Error while validating entity.");
        console.log("ValidationError", errors);
        this.errors = errors;
    }
}