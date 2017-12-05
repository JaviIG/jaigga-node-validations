export class ValidationError extends Error {
    public errors: any;
    constructor(errors: any) {
        super("Error while validating entity.");
        this.errors = errors;
    }
}
