import { expect } from "chai";
import { doValidationSuccess, doValidationWithErrors } from "../../util/validator.model";
import { MIN_LENGTH_ERRORS } from "./min-length.mock";
import { MinLengthDynamicModel } from "./model/min-length-dynamic.model";
import { MinLengthStaticModel } from "./model/min-length-static.model";

describe("@MinLength", () => {
    describe("Static, optional, trimmed", () => {
        it("Should NOT throw an error when the value is bigger.", () => {
            const entity = new MinLengthStaticModel("1234");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal.", () => {
            const entity = new MinLengthStaticModel("123");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error when the value is smaller.", () => {
            const entity = new MinLengthStaticModel("  1  ");
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MIN_LENGTH_ERRORS.STATIC_OPTIONAL.SMALLER);
        });
        it("Should throw an error when the value is blank characters.", () => {
            const entity = new MinLengthStaticModel("\n\t \n\t \n\t ");
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MIN_LENGTH_ERRORS.STATIC_OPTIONAL.BLANK);
        });
        it("Should NOT throw an error when the value is undefined and the validation is optional.", () => {
            const entity = new MinLengthStaticModel(undefined);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is null and the validation is optional.", () => {
            const entity = new MinLengthStaticModel(null);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
    });
    describe("Dynamic, custom error, not trimmed", () => {
        it("Should NOT throw an error when the value is bigger.", () => {
            const entity = new MinLengthDynamicModel("1234", 3);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal.", () => {
            const entity = new MinLengthDynamicModel(" 1 ", 3);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error when the value is smaller.", () => {
            const entity = new MinLengthDynamicModel("12", 3);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MIN_LENGTH_ERRORS.DYNAMIC_CUSTOM_ERROR.SMALLER);
        });
        it("Should throw an error after the dynamic min value is updated to a bigger one.", () => {
            const entity = new MinLengthDynamicModel("123", 3);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
            entity.min = 5;
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MIN_LENGTH_ERRORS.DYNAMIC_CUSTOM_ERROR.AFTER_UPDATE_TO_BIGGER);
        });
        it("Should NOT throw an error after the dynamic min value is updated to a smaller one.", () => {
            const entity = new MinLengthDynamicModel("123", 5);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MIN_LENGTH_ERRORS.DYNAMIC_CUSTOM_ERROR.BEFORE_UPDATE_TO_SMALLER);
            entity.min = 3;
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error if value is null.", () => {
            const entity = new MinLengthDynamicModel(null, 3);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MIN_LENGTH_ERRORS.DYNAMIC_CUSTOM_ERROR.NULL);
        });
        it("Should throw an error if value is undefined.", () => {
            const entity = new MinLengthDynamicModel(undefined, 3);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MIN_LENGTH_ERRORS.DYNAMIC_CUSTOM_ERROR.UNDEFINED);
        });
    });
});
