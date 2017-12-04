import { MIN_MAX_RANGE, MIN_MAX_OPTIONAL, IN_RANGE_DYNAMIC } from './../util/responses.mock';
import { ValidationError } from './../../src/validations/validation-error';
import { validator } from './../util/validator.model';
import { expect } from 'chai';
import { MinMaxValidation, InRangeValidation } from './../util/validation.model';
import { ERRORS } from '../../src/validations/variables';
describe("@Min, @Max, @Greater, @Less", () => {
    it("Should not have errors with values in range.", () => {
        const stuff = new MinMaxValidation(0, 0, 0.0000000001, -0.0000000001, 5);
        validator.validate(stuff);
        const objectErrors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(objectErrors).to.be.eq(undefined);
    });
    it("Should throw a ValidationException with values not in range.", () => {
        const stuff = new MinMaxValidation(-0.0000000001, 0.0000000001, 0, 0, -1);
        expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
        const objectErrors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(objectErrors).to.deep.equal(MIN_MAX_RANGE);
    });
    it("Should throw a ValidationException with values not optional if null or undefined.", () => {
        const stuff = new MinMaxValidation(null, null, undefined, undefined, undefined);
        expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
        const objectErrors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(objectErrors).to.deep.equal(MIN_MAX_OPTIONAL);
    });
});
describe("@InRange", () => {
    it("Should not have errors with values in range.", () => {
        const stuff = new InRangeValidation(5, 0, 10);
        validator.validate(stuff);
        const objectErrors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(objectErrors).to.be.eq(undefined);
    });
    it("Should throw a ValidationException with values not in range.", () => {
        const stuff = new InRangeValidation(10.0000000001, 0, 10);
        expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
        let objectErrors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(objectErrors).to.be.deep.eq(IN_RANGE_DYNAMIC);

        stuff.dynamicMax = 11;
        validator.validate(stuff);
        objectErrors = Reflect.getOwnMetadata(ERRORS, stuff);
        expect(objectErrors).to.be.eq(undefined);
    });
});