import { expect } from "chai";
import { doValidationSuccess, doValidationWithErrors } from "../../util/validator.model";
import { NotNullCustomMessageModel } from "./model/not-null-custom-message.model";
import { NotNullModel } from "./model/not-null.model";
import { NOT_NULL_ERRORS } from "./not-null.mock";

describe("@NotNull", () => {
    describe("Default", () => {
        it("Should validate empty string values.", () => {
            const entity = new NotNullModel("");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate number values", () => {
            const entity = new NotNullModel(0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate boolean values", () => {
            const entity = new NotNullModel(false);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate empty object values", () => {
            const entity = new NotNullModel({ a: 0 });
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate empty array values", () => {
            const entity = new NotNullModel([0]);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error with null values", () => {
            const entity = new NotNullModel(null);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_NULL_ERRORS.DEFAULT.NULL);
        });
        it("Should throw an error with undefined values", () => {
            const entity = new NotNullModel(undefined);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_NULL_ERRORS.DEFAULT.UNDEFINED);
        });
    });
    describe("Custom message", () => {
        it("Should validate empty string values.", () => {
            const entity = new NotNullCustomMessageModel("");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate number values", () => {
            const entity = new NotNullCustomMessageModel(0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate boolean values", () => {
            const entity = new NotNullCustomMessageModel(false);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate empty object values", () => {
            const entity = new NotNullCustomMessageModel({ a: 0 });
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate empty array values", () => {
            const entity = new NotNullCustomMessageModel([0]);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error with null values", () => {
            const entity = new NotNullCustomMessageModel(null);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_NULL_ERRORS.CUSTOM.NULL);
        });
        it("Should throw an error with undefined values", () => {
            const entity = new NotNullCustomMessageModel(undefined);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_NULL_ERRORS.CUSTOM.UNDEFINED);
        });
    });
});
