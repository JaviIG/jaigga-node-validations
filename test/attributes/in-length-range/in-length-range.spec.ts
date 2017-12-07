import { expect } from "chai";
import { doValidationSuccess, doValidationWithErrors } from "../../util/validator.model";
import { IN_LENGTH_RANGE_ERRORS } from "./in-length-range.mock";
import { InLengthRangeDynamicModel } from "./model/in-length-range-dynamic.model";
import { InLengthRangeStaticModel } from "./model/in-length-range-static.model";

describe("@InLengthRange", () => {
    describe("Static, optional, trimmed", () => {
        it("Should NOT throw an error when the value is between the range.", () => {
            const entity = new InLengthRangeStaticModel("1  3");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal to the minimum value of the range.", () => {
            const entity = new InLengthRangeStaticModel("     123");
            expect(doValidationSuccess(entity)).to.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal to the maximum value of the range.", () => {
            const entity = new InLengthRangeStaticModel("12345     ");
            expect(doValidationSuccess(entity)).to.equal(undefined);
        });
        it("Should throw an error when the value is smaller.", () => {
            const entity = new InLengthRangeStaticModel("12");
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_LENGTH_RANGE_ERRORS.STATIC_OPTIONAL.SMALLER);
        });
        it("Should throw an error when the value is bigger.", () => {
            const entity = new InLengthRangeStaticModel("123456");
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_LENGTH_RANGE_ERRORS.STATIC_OPTIONAL.BIGGER);
        });
        it("Should throw an error when the values are blank characters.", () => {
            const entity = new InLengthRangeStaticModel("\n\t \n\t \n\t ");
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_LENGTH_RANGE_ERRORS.STATIC_OPTIONAL.BLANK);
        });
        it("Should NOT throw an error when the value is undefined and the validation is optional.", () => {
            const entity = new InLengthRangeStaticModel(undefined);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is null and the validation is optional.", () => {
            const entity = new InLengthRangeStaticModel(null);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
    });
    describe("Dynamic, custom message, not trimmed", () => {
        it("Should NOT throw an error when the value is between the middle of the range.", () => {
            const entity = new InLengthRangeDynamicModel("1  3", 3, 5);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal to the minimum of the range.", () => {
            const entity = new InLengthRangeDynamicModel("123", 3, 5);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal to the maximum of the range.", () => {
            const entity = new InLengthRangeDynamicModel("12345", 3, 5);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error if the value is smaller.", () => {
            const entity = new InLengthRangeDynamicModel("12", 3, 5);
            expect(doValidationWithErrors(entity))
                .to.be.deep.equal(IN_LENGTH_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.SMALLER);
        });
        it("Should throw an error if the value is bigger.", () => {
            const entity = new InLengthRangeDynamicModel("123456", 3, 5);
            expect(doValidationWithErrors(entity))
                .to.be.deep.equal(IN_LENGTH_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.BIGGER);
        });
        it("Should NOT throw an error after the dynamic min value is updated to a smaller one.", () => {
            const entity = new InLengthRangeDynamicModel("1", 3, 5);
            expect(doValidationWithErrors(entity))
                .to.be.deep.equal(IN_LENGTH_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.BEFORE_UPDATE_MIN_TO_SMALLER);
            entity.min = 0;
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error after the dynamic min value is updated to a bigger one.", () => {
            const entity = new InLengthRangeDynamicModel("1", 0, 5);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
            entity.min = 3;
            expect(doValidationWithErrors(entity))
                .to.be.deep.equal(IN_LENGTH_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.AFTER_UPDATE_MIN_TO_BIGGER);
        });
        it("Should NOT throw an error after the dynamic max value is updated to a bigger one.", () => {
            const entity = new InLengthRangeDynamicModel("123", 0, 2);
            expect(doValidationWithErrors(entity))
                .to.be.deep.equal(IN_LENGTH_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.BEFORE_UPDATE_MAX_TO_BIGGER);
            entity.max = 5;
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error after the dynamic max value is updated to a smaller one.", () => {
            const entity = new InLengthRangeDynamicModel("123", 0, 5);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
            entity.max = 2;
            expect(doValidationWithErrors(entity))
                .to.be.deep.equal(IN_LENGTH_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.AFTER_UPDATE_MAX_TO_SMALLER);
        });
        it("Should throw an error if value is null.", () => {
            const entity = new InLengthRangeDynamicModel(null, 3, 5);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_LENGTH_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.NULL);
        });
        it("Should throw an error if value is undefined.", () => {
            const entity = new InLengthRangeDynamicModel(undefined, 3, 5);
            expect(doValidationWithErrors(entity))
                .to.be.deep.equal(IN_LENGTH_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.UNDEFINED);
        });
    });
});
