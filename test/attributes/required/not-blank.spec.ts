
import { expect } from 'chai';
import { NotBlankValidation } from '../../util/validation.model';
import { validator } from '../../util/validator.model';
import { ERRORS } from '../../../src/validations/variables';
import { ValidationError } from '../../../src/index';
import { NOT_BLANK_TEST } from '../../util/responses.mock';


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