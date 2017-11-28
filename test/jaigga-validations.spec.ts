import { NOT_NULL_TEST, NOT_EMPTY_TEST, NOT_BLANK_TEST, MIN_MAX_RANGE, MIN_MAX_OPTIONAL, MIN_LENGTH_MAX_LENGTH_RANGE, MIN_LENGTH_MAX_LENGTH_OPTIONAL, REGEX_INVALID, REGEX_OPTIONAL } from './Stuff.mock';
import { ERRORS } from './../src/variables';
import { NotNull, NotEmpty, NotBlank, MinMax, MinLengthMaxLength, RegexValidation } from './Stuff.model';
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
            const stuff = new NotNull("", 0, [], {});
            validator.validate(stuff);
            const errors = Reflect.getOwnMetadata(ERRORS, stuff);
            expect(errors).to.be.eq(undefined);
        });
        it("Should throw a ValidationException with null or undefined values", () => {
            const stuff = new NotNull(null, undefined, null, undefined);
            expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(NOT_NULL_TEST);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
    })
    describe("@notEmpty", () => {
        it("Should not have errors with null or undefined values", () => {
            const stuff = new NotEmpty(null, undefined, null, undefined);
            validator.validate(stuff);
            const errors = Reflect.getOwnMetadata(ERRORS, stuff);
            expect(errors).to.be.eq(undefined);
        });
        it("Should throw a ValidationException with '', [], {} values", () => {
            const stuff = new NotEmpty('', 0, [], {});
            expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(NOT_EMPTY_TEST);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
    });
    describe("@notBlank", () => {
        it("Should not have errors with values distinct of null, undefined or empty", () => {
            const stuff = new NotBlank('a', 0, [''], { "key": null });
            validator.validate(stuff);
            const errors = Reflect.getOwnMetadata(ERRORS, stuff);
            expect(errors).to.be.eq(undefined);
        });
        it("Should throw a ValidationException with '', [], {} values", () => {
            const stuff = new NotBlank('', null, [], {});
            expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(NOT_BLANK_TEST);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
    });
    describe("@min, @max", () => {
        it("Should not have errors with values in range.", () => {
            const stuff = new MinMax(0, 0, 0.0000000001, -0.0000000001, 5);
            validator.validate(stuff);
            const errors = Reflect.getOwnMetadata(ERRORS, stuff);
            expect(errors).to.be.eq(undefined);
        });
        it("Should throw a ValidationException with values not in range.", () => {
            const stuff = new MinMax(-0.0000000001, 0.0000000001, 0, 0, -1);
            expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(MIN_MAX_RANGE);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
        it("Should throw a ValidationException with values not optional if null or undefined.", () => {
            const stuff = new MinMax(null, null, undefined, undefined, undefined);
            expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(MIN_MAX_OPTIONAL);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
    });
    describe("@minLength, @maxLength", () => {
        it("Should not have errors with values in length range.", () => {
            const stuff = new MinLengthMaxLength("1", "12345", "123");
            validator.validate(stuff);
            const errors = Reflect.getOwnMetadata(ERRORS, stuff);
            expect(errors).to.be.eq(undefined);
        });
        it("Should throw a ValidationException with values not in length range.", () => {
            const stuff = new MinLengthMaxLength("", "123456", "");
            expect(validator.validate.bind(validator, stuff)).to.throw(ValidationError);
            const objectErrors = JSON.stringify(Reflect.getOwnMetadata(ERRORS, stuff));
            const expectedErrors = JSON.stringify(MIN_LENGTH_MAX_LENGTH_RANGE);
            expect(objectErrors).to.be.equal(expectedErrors);
        });
        it("Should throw a ValidationException with values not optional if null or undefined.", () => {
            const stuff = new MinLengthMaxLength(null, undefined, null);
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

    describe("@inValues", () => { });
});