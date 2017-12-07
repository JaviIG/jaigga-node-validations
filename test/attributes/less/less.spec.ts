import { expect } from "chai";
import { doValidationSuccess, doValidationWithErrors } from "../../util/validator.model";
import { LESS_ERRORS } from "./less.mock";
import { LessDynamicModel } from "./model/less-dynamic.model";
import { LessStaticModel } from "./model/less-static.model";

describe("@Less", () => {
    describe("Static values", () => {
        it("Should NOT throw an error when the value is smaller.", () => {
            const entity = new LessStaticModel(-0.0000000001);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error when the value is equal.", () => {
            const entity = new LessStaticModel(0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(LESS_ERRORS.STATIC_OPTIONAL.EQUAL);
        });
        it("Should throw an error when the value is bigger.", () => {
            const entity = new LessStaticModel(0.0000000001);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(LESS_ERRORS.STATIC_OPTIONAL.BIGGER);
        });
        it("Should NOT throw an error when the value is undefined and the validation is optional.", () => {
            const entity = new LessStaticModel(undefined);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is null and the validation is optional.", () => {
            const entity = new LessStaticModel(null);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
    });
    describe("Dynamic values", () => {
        it("Should NOT throw an error when the value is smaller.", () => {
            const entity = new LessDynamicModel(-0.0000000001, 0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error when the value is equal.", () => {
            const entity = new LessDynamicModel(0, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(LESS_ERRORS.DYNAMIC_CUSTOM_MESSAGE.EQUAL);
        });
        it("Should throw an error when the value is bigger.", () => {
            const entity = new LessDynamicModel(0.0000000001, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(LESS_ERRORS.DYNAMIC_CUSTOM_MESSAGE.BIGGER);
        });
        it("Should throw an error after the dynamic max value is updated to a smaller one.", () => {
            const entity = new LessDynamicModel(-1, 0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
            entity.max = -1;
            expect(doValidationWithErrors(entity)).to.be.deep.equal(LESS_ERRORS.DYNAMIC_CUSTOM_MESSAGE.AFTER_UPDATE_TO_SMALLER);
        });
        it("Should NOT throw an error after the dynamic max value is updated to a bigger one.", () => {
            const entity = new LessDynamicModel(0, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(LESS_ERRORS.DYNAMIC_CUSTOM_MESSAGE.BEFORE_UPDATE_TO_BIGGER);
            entity.max = 1;
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error if value is null.", () => {
            const entity = new LessDynamicModel(null, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(LESS_ERRORS.DYNAMIC_CUSTOM_MESSAGE.NULL);
        });
        it("Should throw an error if value is undefined.", () => {
            const entity = new LessDynamicModel(undefined, 0);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(LESS_ERRORS.DYNAMIC_CUSTOM_MESSAGE.UNDEFINED);
        });
    });
});
