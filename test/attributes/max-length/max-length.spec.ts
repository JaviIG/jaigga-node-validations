import { expect } from "chai";
import { doValidationSuccess, doValidationWithErrors } from "../../util/validator.model";
import { MAX_ERRORS } from "./max-length.mock";
import { MaxLengthDynamicModel } from "./model/max-length-dynamic.model";
import { MaxLengthStaticModel } from "./model/max-length-static.model";

describe("@MaxLength", () => {
    describe("Static, optional, trimmed", () => {
        it("Should NOT throw an error when the value is smaller.", () => {
            const entity = new MaxLengthStaticModel("123");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal.", () => {
            const entity = new MaxLengthStaticModel(" 12345 ");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error when the value is bigger.", () => {
            const entity = new MaxLengthStaticModel("12  56");
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MAX_ERRORS.STATIC_OPTIONAL.BIGGER);
        });
        it("Should throw an error when the value contains blank characters between non-blank characters and is bigger.", () => {
            const entity = new MaxLengthStaticModel("1\n\t \n\t \n\t 1");
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MAX_ERRORS.STATIC_OPTIONAL.BLANK);
        });
        it("Should NOT throw an error when the value is undefined and the validation is optional.", () => {
            const entity = new MaxLengthStaticModel(undefined);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is null and the validation is optional.", () => {
            const entity = new MaxLengthStaticModel(null);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
    });
    describe("Dynamic, custom message, not trimmed", () => {
        it("Should NOT throw an error when the value is smaller.", () => {
            const entity = new MaxLengthDynamicModel("123", 5);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal.", () => {
            const entity = new MaxLengthDynamicModel("12345", 5);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error when the value is bigger.", () => {
            const entity = new MaxLengthDynamicModel("123456", 5);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MAX_ERRORS.DYNAMIC_CUSTOM_ERROR.BIGGER);
        });
        it("Should throw an error after the dynamic max value is updated to a smaller one.", () => {
            const entity = new MaxLengthDynamicModel("1234", 5);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
            entity.max = 3;
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MAX_ERRORS.DYNAMIC_CUSTOM_ERROR.AFTER_UPDATE_TO_SMALLER);
        });
        it("Should NOT throw an error after the dynamic max value is updated to a bigger one.", () => {
            const entity = new MaxLengthDynamicModel("1234", 3);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MAX_ERRORS.DYNAMIC_CUSTOM_ERROR.BEFORE_UPDATE_TO_BIGGER);
            entity.max = 5;
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error if value is null.", () => {
            const entity = new MaxLengthDynamicModel(null, 5);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MAX_ERRORS.DYNAMIC_CUSTOM_ERROR.NULL);
        });
        it("Should throw an error if value is undefined.", () => {
            const entity = new MaxLengthDynamicModel(undefined, 5);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MAX_ERRORS.DYNAMIC_CUSTOM_ERROR.UNDEFINED);
        });
    });
});
