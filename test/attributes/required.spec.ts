import { expect } from 'chai';
import { validator } from './../util/validator.model';
import { NotNullValidation, NotEmptyValidation, NotBlankValidation } from './../util/validation.model';
import { ERRORS } from '../../src/validations/variables';
import { NOT_NULL_TEST, NOT_EMPTY_TEST, NOT_BLANK_TEST } from '../util/responses.mock';
import { ValidationError } from '../../src/index';

describe("@NotNull", () => {
    it("Should not have errors with '', 0, [], {} values", () => {
        const stuff = new NotNullValidation("", 0, [], {});
        validator.validate(stuff);
        const errors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(errors).to.be.eq(undefined);
    });
    it("Should throw a ValidationException with null or undefined values", () => {
        const stuff = new NotNullValidation(null, undefined, null, undefined);
        expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
        const objectErrors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(objectErrors).to.deep.equal(NOT_NULL_TEST);
    });
})
describe("@NotEmpty", () => {
    it("Should not have errors with null or undefined values", () => {
        const stuff = new NotEmptyValidation(null, undefined, null, undefined);
        validator.validate(stuff);
        const errors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(errors).to.be.eq(undefined);
    });
    it("Should throw a ValidationException with '', [], {} values", () => {
        const stuff = new NotEmptyValidation('', 0, [], {});
        expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
        const objectErrors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(objectErrors).to.deep.equal(NOT_EMPTY_TEST);
    });
});
describe("@NotBlank", () => {
    it("Should not have errors with values distinct of null, undefined or empty", () => {
        const stuff = new NotBlankValidation('a', 0, [''], { "key": null });
        validator.validate(stuff);
        const errors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(errors).to.be.eq(undefined);
    });
    it("Should throw a ValidationException with '', [], {} values", () => {
        const stuff = new NotBlankValidation('', null, [], {});
        expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
        const objectErrors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(objectErrors).to.deep.equal(NOT_BLANK_TEST);
    });
});