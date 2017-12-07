import { expect } from "chai";
import { doValidationSuccess, doValidationWithErrors } from "../../util/validator.model";
import { MAX_ERRORS } from "./max.mock";
import { MaxDynamicModel } from "./model/max-dynamic.model";
import { MaxStaticModel } from "./model/max-static.model";

describe("@Max", () => {
    describe("Static and optional configuration", () => {
        it("Should NOT throw an error when the value is smaller.", () => {
            const entity = new MaxStaticModel(-0.0000000001);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal.", () => {
            const entity = new MaxStaticModel(0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error when the value is bigger.", () => {
            const entity = new MaxStaticModel(0.0000000001);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MAX_ERRORS.STATIC_OPTIONAL.BIGGER);
        });
        it("Should NOT throw an error when the value is undefined and the validation is optional.", () => {
            const entity = new MaxStaticModel(undefined);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is null and the validation is optional.", () => {
            const entity = new MaxStaticModel(null);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
    });
    describe("Dynamic and custom message configuration", () => {
        it("Should NOT throw an error when the value is smaller.", () => {
            const entity = new MaxDynamicModel(-0.0000000001, 0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal.", () => {
            const entity = new MaxDynamicModel(0, 0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error when the value is bigger.", () => {
            const entity = new MaxDynamicModel(0.0000000001, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MAX_ERRORS.DYNAMIC_CUSTOM_ERROR.BIGGER);
        });
        it("Should throw an error after the dynamic max value is updated to a smaller one.", () => {
            const entity = new MaxDynamicModel(0, 0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
            entity.max = -1;
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MAX_ERRORS.DYNAMIC_CUSTOM_ERROR.AFTER_UPDATE_TO_SMALLER);
        });
        it("Should NOT throw an error after the dynamic max value is updated to a bigger one.", () => {
            const entity = new MaxDynamicModel(0.0000000001, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MAX_ERRORS.DYNAMIC_CUSTOM_ERROR.BEFORE_UPDATE_TO_BIGGER);
            entity.max = 0.0000000001;
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error if value is null.", () => {
            const entity = new MaxDynamicModel(null, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MAX_ERRORS.DYNAMIC_CUSTOM_ERROR.NULL);
        });
        it("Should throw an error if value is undefined.", () => {
            const entity = new MaxDynamicModel(undefined, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MAX_ERRORS.DYNAMIC_CUSTOM_ERROR.UNDEFINED);
        });
    });
});
