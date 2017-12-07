import { expect } from "chai";
import { Valid, Validate, ValidationError } from "../../src/index";
import { ERRORS } from "../../src/validations/variables";

class Validator {

    @Validate()
    public validate( @Valid() something: any): any {
        return something;
    }
}

const validator = new Validator();
/**
 * Performs a validation
 * @param stuff The object to validate
 * @returns The errors after the validation. They should be undefined.
 */
export function doValidationSuccess(stuff: any): any {
    validator.validate(stuff);
    return Reflect.getOwnMetadata(ERRORS, stuff);
}

/**
 * Performs a validation expecting it to have an error and returning the errors occured
 * @param stuff The object to validate
 * @returns The errors after the validation.
 */
export function doValidationWithErrors(stuff: any): any {
    expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
    return Reflect.getOwnMetadata(ERRORS, stuff);
}
