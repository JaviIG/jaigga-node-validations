import { REGEX_INVALID, REGEX_OPTIONAL } from './../../util/responses.mock';
import { ValidationError } from './../../../src/validations/validation-error';
import { expect } from 'chai';
import { validator } from './../../util/validator.model';
import { RegexValidation } from './../../util/validation.model';
import { ERRORS } from '../../../src/validations/variables';
describe("@HasRegex, @Email", () => {
    it("Should validate values which match the regex", () => {
        const stuff = new RegexValidation("donkey", "user@domain.com");
        validator.validate(stuff);
        const errors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(errors).to.be.eq(undefined);
    });
    it("Should throw a ValidationException with values which not match the regex.", () => {
        const stuff = new RegexValidation("doge", "not-an-email");
        expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
        const objectErrors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(objectErrors).to.deep.equal(REGEX_INVALID);
    });
    it("Should throw a ValidationException with values not optional if null or undefined.", () => {
        const stuff = new RegexValidation(null, undefined);
        expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
        const objectErrors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(objectErrors).to.deep.equal(REGEX_OPTIONAL);
    });
});