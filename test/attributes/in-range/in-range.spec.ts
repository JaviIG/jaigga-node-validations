import { expect } from "chai";
import { doValidationSuccess, doValidationWithErrors } from "../../util/validator.model";
import { IN_RANGE_ERRORS } from "./in-range.mock";
import { InRangeDynamicModel } from "./model/in-range-dynamic.model";
import { InRangeStaticModel } from "./model/in-range-static.model";

describe("@InRange", () => {
    describe("Static values", () => {
        it("Should NOT throw an error when the value is between the range.", () => {
            const entity = new InRangeStaticModel(5);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal to the minimum value of the range.", () => {
            const entity = new InRangeStaticModel(0);
            expect(doValidationSuccess(entity)).to.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal to the maximum value of the range.", () => {
            const entity = new InRangeStaticModel(10);
            expect(doValidationSuccess(entity)).to.equal(undefined);
        });
        it("Should throw an error when the value is smaller.", () => {
            const entity = new InRangeStaticModel(-0.0000000001);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_RANGE_ERRORS.STATIC_OPTIONAL.SMALLER);
        });
        it("Should throw an error when the value is bigger.", () => {
            const entity = new InRangeStaticModel(10.0000000001);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_RANGE_ERRORS.STATIC_OPTIONAL.BIGGER);
        });
        it("Should NOT throw an error when the value is undefined and the validation is optional.", () => {
            const entity = new InRangeStaticModel(undefined);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is null and the validation is optional.", () => {
            const entity = new InRangeStaticModel(null);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
    });
    describe("Dynamic values", () => {
        it("Should NOT throw an error when the value is in the middle of the range.", () => {
            const entity = new InRangeDynamicModel(5, 0, 10);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal to the minimum of the range.", () => {
            const entity = new InRangeDynamicModel(0, 0, 10);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when the value is equal to the maximum of the range.", () => {
            const entity = new InRangeDynamicModel(10, 0, 10);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error if the value is smaller.", () => {
            const entity = new InRangeDynamicModel(-0.0000000001, 0, 10);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.SMALLER);
        });
        it("Should throw an error if the value is bigger.", () => {
            const entity = new InRangeDynamicModel(10.0000000001, 0, 10);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.BIGGER);
        });
        it("Should NOT throw an error after the dynamic min value is updated to a smaller one.", () => {
            const entity = new InRangeDynamicModel(5, 6, 10);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.BEFORE_UPDATE_MIN_TO_SMALLER);
            entity.min = 0;
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error after the dynamic min value is updated to a bigger one.", () => {
            const entity = new InRangeDynamicModel(5, 0, 10);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
            entity.min = 6;
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.AFTER_UPDATE_MIN_TO_BIGGER);
        });
        it("Should NOT throw an error after the dynamic max value is updated to a bigger one.", () => {
            const entity = new InRangeDynamicModel(5, 0, 4);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.BEFORE_UPDATE_MAX_TO_BIGGER);
            entity.max = 10;
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error after the dynamic max value is updated to a smaller one.", () => {
            const entity = new InRangeDynamicModel(5, 0, 10);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
            entity.max = 4;
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.AFTER_UPDATE_MAX_TO_SMALLER);
        });
        it("Should throw an error if value is null.", () => {
            const entity = new InRangeDynamicModel(null, 0, 10);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.NULL);
        });
        it("Should throw an error if value is undefined.", () => {
            const entity = new InRangeDynamicModel(undefined, 0, 10);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_RANGE_ERRORS.DYNAMIC_CUSTOM_MESSAGE.UNDEFINED);
        });
    });
});
