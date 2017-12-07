import { expect } from "chai";
import { doValidationSuccess, doValidationWithErrors } from "../../util/validator.model";
import { GREATER_ERRORS } from "./greater.mock";
import { GreaterDynamicModel } from "./model/greater-dynamic.model";
import { GreaterStaticModel } from "./model/greater-static.model";

describe("@Greater", () => {
    describe("Static values", () => {
        it("Should NOT throw an error when the value is bigger.", () => {
            const entity = new GreaterStaticModel(0.0000000001);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error when the value is equal.", () => {
            const entity = new GreaterStaticModel(0);
            expect(doValidationWithErrors(entity)).to.deep.equal(GREATER_ERRORS.STATIC_OPTIONAL.EQUAL);
        });
        it("Should throw an error when the value is smaller.", () => {
            const entity = new GreaterStaticModel(-0.0000000001);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(GREATER_ERRORS.STATIC_OPTIONAL.SMALLER);
        });
        it("Should NOT throw an error when the value is undefined and the validation is optional.", () => {
            const entity = new GreaterStaticModel(undefined);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is null and the validation is optional.", () => {
            const entity = new GreaterStaticModel(null);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
    });
    describe("Dynamic values", () => {
        it("Should NOT throw an error when the value is bigger.", () => {
            const entity = new GreaterDynamicModel(0.0000000001, 0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error when the value is equal.", () => {
            const entity = new GreaterDynamicModel(0, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(GREATER_ERRORS.DYNAMIC_CUSTOM_MESSAGE.EQUAL);
        });
        it("Should throw an error when the value is smaller.", () => {
            const entity = new GreaterDynamicModel(-0.0000000001, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(GREATER_ERRORS.DYNAMIC_CUSTOM_MESSAGE.SMALLER);
        });
        it("Should throw an error after the dynamic min value is updated to a bigger one.", () => {
            const entity = new GreaterDynamicModel(1, 0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
            entity.min = 1;
            expect(doValidationWithErrors(entity)).to.be.deep.equal(GREATER_ERRORS.DYNAMIC_CUSTOM_MESSAGE.AFTER_UPDATE_TO_BIGGER);
        });
        it("Should NOT throw an error after the dynamic min value is updated to a smaller one.", () => {
            const entity = new GreaterDynamicModel(0, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(GREATER_ERRORS.DYNAMIC_CUSTOM_MESSAGE.BEFORE_UPDATE_TO_SMALLER);
            entity.min = -1;
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error if value is null.", () => {
            const entity = new GreaterDynamicModel(null, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(GREATER_ERRORS.DYNAMIC_CUSTOM_MESSAGE.NULL);
        });
        it("Should throw an error if value is undefined.", () => {
            const entity = new GreaterDynamicModel(undefined, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(GREATER_ERRORS.DYNAMIC_CUSTOM_MESSAGE.UNDEFINED);
        });
    });
});
