import { expect } from "chai";
import { doValidationSuccess, doValidationWithErrors } from "../../util/validator.model";
import { IN_VALUES_ERRORS } from "./in-values.mock";
import { InValuesDynamicModel } from "./model/in-values-dynamic.model";
import { InValuesStaticModel } from "./model/in-values-static.model";

describe("@InValues", () => {
    describe("Static, simple values", () => {
        it("Should NOT throw an error if a string value is in allowedValues", () => {
            const entity = new InValuesStaticModel("0");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error if a number value is in allowedValues", () => {
            const entity = new InValuesStaticModel(1);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error if a boolean value is in allowedValues", () => {
            const entity = new InValuesStaticModel(true);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error if an array value is in allowedValues", () => {
            const entity = new InValuesStaticModel([1, 2]);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error if an object value is in allowedValues", () => {
            const entity = new InValuesStaticModel({ a: 1 });
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error if undefined is in allowedValues", () => {
            const entity = new InValuesStaticModel(undefined);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error if value is NOT in allowedValues", () => {
            const entity = new InValuesStaticModel(false);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_VALUES_ERRORS.STATIC.NOT_IN_VALUES);
        });
        it("Should throw an error if value is NULL", () => {
            const entity = new InValuesStaticModel(null);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_VALUES_ERRORS.STATIC.NULL);
        });
    });
    describe("Dynamic, custom message", () => {
        it("Should NOT throw an error if value is in allowedValues", () => {
            const entity = new InValuesDynamicModel("0", ["0", 1, true, { a: 1 }, [1, 2], null]);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error if value is NOT in allowedValues", () => {
            const entity = new InValuesDynamicModel(false, ["0", 1, true, { a: 1 }, [1, 2], null]);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_VALUES_ERRORS.DYNAMIC_CUSTOM_ERROR.NOT_IN_VALUES);
        });
        it("Should NOT throw an error if value was NOT in allowedValues, but now it's", () => {
            const entity = new InValuesDynamicModel({ b: 2 }, ["0", 1, true, { a: 1 }, [1, 2], null]);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_VALUES_ERRORS.DYNAMIC_CUSTOM_ERROR.BEFORE_ADD);
            entity.allowedValues.push({ b: 2 });
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error if value was in allowedValues, but now it's not", () => {
            const entity = new InValuesDynamicModel("0", ["0", 1, true, { a: 1 }, [1, 2], null]);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
            entity.allowedValues = entity.allowedValues.filter((value) => value === "0" ? false : true);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_VALUES_ERRORS.DYNAMIC_CUSTOM_ERROR.AFTER_REMOVE);
        });
        it("Should throw an error if value is UNDEFINED", () => {
            const entity = new InValuesDynamicModel(undefined, ["0", 1, true, { a: 1 }, [1, 2], null]);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(IN_VALUES_ERRORS.DYNAMIC_CUSTOM_ERROR.UNDEFINED);
        });
    });
});
