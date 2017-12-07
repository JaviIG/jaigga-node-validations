import { expect } from "chai";
import { doValidationSuccess, doValidationWithErrors } from "../../util/validator.model";
import { MIN_ERRORS } from "./min.mock";
import { MinDynamicModel } from "./model/min-dynamic.model";
import { MinStaticModel } from "./model/min-static.model";

describe("@Min", () => {
    describe("Static and optional configuration", () => {
        it("Should NOT throw an error when the value is bigger.", () => {
            const entity = new MinStaticModel(0.0000000001);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal.", () => {
            const entity = new MinStaticModel(0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error when the value is smaller.", () => {
            const entity = new MinStaticModel(-0.0000000001);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MIN_ERRORS.STATIC_OPTIONAL.SMALLER);
        });
        it("Should NOT throw an error when the value is undefined and the validation is optional.", () => {
            const entity = new MinStaticModel(undefined);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is null and the validation is optional.", () => {
            const entity = new MinStaticModel(null);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
    });
    describe("Dynamic and custom message configuration", () => {
        it("Should NOT throw an error when the value is bigger.", () => {
            const entity = new MinDynamicModel(0.0000000001, 0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal.", () => {
            const entity = new MinDynamicModel(0, 0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error when the value is smaller.", () => {
            const entity = new MinDynamicModel(-0.0000000001, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MIN_ERRORS.DYNAMIC_CUSTOM_ERROR.SMALLER);
        });
        it("Should throw an error after the dynamic min value is updated to a bigger one.", () => {
            const entity = new MinDynamicModel(0, 0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
            entity.min = 1;
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MIN_ERRORS.DYNAMIC_CUSTOM_ERROR.AFTER_UPDATE_TO_BIGGER);
        });
        it("Should NOT throw an error after the dynamic min value is updated to a smaller one.", () => {
            const entity = new MinDynamicModel(-0.0000000001, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MIN_ERRORS.DYNAMIC_CUSTOM_ERROR.BEFORE_UPDATE_TO_SMALLER);
            entity.min = -0.0000000001;
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error if value is null.", () => {
            const entity = new MinDynamicModel(null, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MIN_ERRORS.DYNAMIC_CUSTOM_ERROR.NULL);
        });
        it("Should throw an error if value is undefined.", () => {
            const entity = new MinDynamicModel(undefined, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(MIN_ERRORS.DYNAMIC_CUSTOM_ERROR.UNDEFINED);
        });
    });
});
