import { ValidationError } from './../../../src/validations/validation-error';
import { validator } from './../../util/validator.model';
import { NotEmptyValidation } from './../../util/validation.model';

import { expect } from 'chai';
import { ERRORS } from '../../../src/validations/variables';
import { NOT_EMPTY_TEST } from '../../util/responses.mock';

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