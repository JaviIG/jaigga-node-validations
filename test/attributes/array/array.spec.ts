import { expect } from 'chai';
import { validator } from './../../util/validator.model';
import { InValuesValidation } from './../../util/validation.model';
import { ERRORS } from '../../../src/validations/variables';
import { ValidationError } from '../../../src/index';
import { IN_VALUES_INVALID } from '../../util/responses.mock';
describe("@InValues", () => {
    it("Should validate simple, object and array values.", () => {
        const stuff = new InValuesValidation(InValuesValidation.STR_VALUES[0],
            InValuesValidation.NUM_VALUES[0],
            InValuesValidation.ARR_VALUES[0],
            InValuesValidation.OBJ_VALUES[0]);
        validator.validate(stuff);
        const errors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(errors).to.be.eq(undefined);
    });
    it("Should validate null and undefined values if specified inside the valid values array.", () => {
        const stuff = new InValuesValidation(null, undefined, null, undefined);
        validator.validate(stuff);
        const errors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(errors).to.be.eq(undefined);
    });
    it("Should throw a ValidationException when the value is not in the allowed array", () => {
        const stuff = new InValuesValidation("z", 99, [], {});
        expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
        const objectErrors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(objectErrors).to.deep.equal(IN_VALUES_INVALID);
    });
});