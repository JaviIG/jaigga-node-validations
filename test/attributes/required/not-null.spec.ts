import { expect } from 'chai';
import { validator } from './../../util/validator.model';
import { NotNullValidation } from './../../util/validation.model';
import { ERRORS } from '../../../src/validations/variables';
import { NOT_NULL_TEST } from '../../util/responses.mock';
import { ValidationError } from '../../../src/index';

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