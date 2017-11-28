import { NOT_NULL_TEST, NOT_EMPTY_TEST, NOT_BLANK_TEST, MIN_MAX_RANGE, MIN_MAX_OPTIONAL, MIN_LENGTH_MAX_LENGTH_RANGE, MIN_LENGTH_MAX_LENGTH_OPTIONAL, REGEX_INVALID, REGEX_OPTIONAL, IN_VALUES_INVALID } from './Stuff.mock';
import { ERRORS } from './../src/variables';
import { NotNullValidation, NotEmptyValidation, NotBlankValidation, MinMaxValidation, MinLengthMaxLengthValidation, RegexValidation, InValuesValidation } from './Stuff.model';
import { expect } from 'chai';
import { valid, validate } from '../src/index';
import { ValidationError } from '../src/validation/validation-error';

class Validator {

    @validate()
    validate( @valid() something: any) {
        //My only proposit is to validate the stuff entity
    }
}

describe("Validations", () => {
    const validator: Validator = new Validator();
    describe("@notNull", () => {
        it("Should not have errors with '', 0, [], {} values", () => {
            const stuff = new NotNullValidation("", 0, [], {});
            validator.validate(stuff);
            const errors = Reflect.getOwnMetadata(ERRORS, stuff);
            expect(errors).to.be.eq(undefined);
        });
        it("Should throw a ValidationException with null or undefined values", () => {
            const stuff = new NotNullValidation(null, undefined, null, undefined);
            expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(NOT_NULL_TEST);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
    })
    describe("@notEmpty", () => {
        it("Should not have errors with null or undefined values", () => {
            const stuff = new NotEmptyValidation(null, undefined, null, undefined);
            validator.validate(stuff);
            const errors = Reflect.getOwnMetadata(ERRORS, stuff);
            expect(errors).to.be.eq(undefined);
        });
        it("Should throw a ValidationException with '', [], {} values", () => {
            const stuff = new NotEmptyValidation('', 0, [], {});
            expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(NOT_EMPTY_TEST);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
    });
    describe("@notBlank", () => {
        it("Should not have errors with values distinct of null, undefined or empty", () => {
            const stuff = new NotBlankValidation('a', 0, [''], { "key": null });
            validator.validate(stuff);
            const errors = Reflect.getOwnMetadata(ERRORS, stuff);
            expect(errors).to.be.eq(undefined);
        });
        it("Should throw a ValidationException with '', [], {} values", () => {
            const stuff = new NotBlankValidation('', null, [], {});
            expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(NOT_BLANK_TEST);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
    });
    describe("@min, @max", () => {
        it("Should not have errors with values in range.", () => {
            const stuff = new MinMaxValidation(0, 0, 0.0000000001, -0.0000000001, 5);
            validator.validate(stuff);
            const errors = Reflect.getOwnMetadata(ERRORS, stuff);
            expect(errors).to.be.eq(undefined);
        });
        it("Should throw a ValidationException with values not in range.", () => {
            const stuff = new MinMaxValidation(-0.0000000001, 0.0000000001, 0, 0, -1);
            expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(MIN_MAX_RANGE);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
        it("Should throw a ValidationException with values not optional if null or undefined.", () => {
            const stuff = new MinMaxValidation(null, null, undefined, undefined, undefined);
            expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(MIN_MAX_OPTIONAL);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
    });
    describe("@minLength, @maxLength", () => {
        it("Should not have errors with values in length range.", () => {
            const stuff = new MinLengthMaxLengthValidation("1", "12345", "123");
            validator.validate(stuff);
            const errors = Reflect.getOwnMetadata(ERRORS, stuff);
            expect(errors).to.be.eq(undefined);
        });
        it("Should throw a ValidationException with values not in length range.", () => {
            const stuff = new MinLengthMaxLengthValidation("", "123456", "");
            expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(MIN_LENGTH_MAX_LENGTH_RANGE);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
        it("Should throw a ValidationException with values not optional if null or undefined.", () => {
            const stuff = new MinLengthMaxLengthValidation(null, undefined, null);
            expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(MIN_LENGTH_MAX_LENGTH_OPTIONAL);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
    });
    describe("@hasRegex, @email", () => {
        it("Should validate values which match the regex", () => {
            const stuff = new RegexValidation("donkey", "user@domain.com");
            validator.validate(stuff);
            const errors = Reflect.getOwnMetadata(ERRORS, stuff);
            expect(errors).to.be.eq(undefined);
        });
        it("Should throw a ValidationException with values which not match the regex.", () => {
            const stuff = new RegexValidation("doge", "not-an-email");
            expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(REGEX_INVALID);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
        it("Should throw a ValidationException with values not optional if null or undefined.", () => {
            const stuff = new RegexValidation(null, undefined);
            expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(REGEX_OPTIONAL);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
    });

    describe("@inValues", () => {
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
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(IN_VALUES_INVALID);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
    });
});