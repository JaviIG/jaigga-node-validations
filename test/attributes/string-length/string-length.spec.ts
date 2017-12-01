import { ValidationError } from './../../../src/validations/validation-error';
import { MIN_LENGTH_MAX_LENGTH_RANGE, MIN_LENGTH_MAX_LENGTH_OPTIONAL } from './../../util/responses.mock';
import { expect } from 'chai';
import { validator } from './../../util/validator.model';
import { MinLengthMaxLengthValidation } from './../../util/validation.model';
import { ERRORS } from '../../../src/validations/variables';
describe("@MinLength, @MaxLength", () => {
    it("Should not have errors with values in length range.", () => {
        const stuff = new MinLengthMaxLengthValidation("1", "12345", "123");
        validator.validate(stuff);
        const errors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(errors).to.be.eq(undefined);
    });
    it("Should throw a ValidationException with values not in length range.", () => {
        const stuff = new MinLengthMaxLengthValidation("", "123456", "");
        expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
        const objectErrors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(objectErrors).to.deep.equal(MIN_LENGTH_MAX_LENGTH_RANGE);
    });
    it("Should throw a ValidationException with values not optional if null or undefined.", () => {
        const stuff = new MinLengthMaxLengthValidation(null, undefined, null);
        expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
        const objectErrors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(objectErrors).to.deep.equal(MIN_LENGTH_MAX_LENGTH_OPTIONAL);
    });
});