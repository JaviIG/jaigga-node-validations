import { expect } from "chai";
import { doValidationSuccess, doValidationWithErrors } from "../../util/validator.model";
import { NotBlankModel } from "./model/not-blank.model";
import { NOT_BLANK_ERRORS } from "./not-blank.mock";
import { NotBlankCustomMessageModel } from "./model/not-blank-custom-message.model";

describe("@NotBlank", () => {
    describe("Default", () => {
        it("Should validate string values.", () => {
            const entity = new NotBlankModel("a");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate number values", () => {
            const entity = new NotBlankModel(0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate boolean values", () => {
            const entity = new NotBlankModel(false);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate non empty object values", () => {
            const entity = new NotBlankModel({ a: 0 });
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate non empty array values", () => {
            const entity = new NotBlankModel([0]);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error with blank strings", () => {
            const entity = new NotBlankModel("\n\t ");
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_BLANK_ERRORS.DEFAULT.BLANK_STRING);
        });
        it("Should throw an error with empty arrays", () => {
            const entity = new NotBlankModel([]);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_BLANK_ERRORS.DEFAULT.EMPTY_ARRAY);
        });
        it("Should throw an error with empty objects", () => {
            const entity = new NotBlankModel({});
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_BLANK_ERRORS.DEFAULT.EMPTY_OBJECT);
        });
        it("Should throw an error with null values", () => {
            const entity = new NotBlankModel(null);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_BLANK_ERRORS.DEFAULT.NULL);
        });
        it("Should throw an error with undefined values", () => {
            const entity = new NotBlankModel(undefined);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_BLANK_ERRORS.DEFAULT.UNDEFINED);
        });
    });
    describe("Custom message", () => {
        it("Should validate string values.", () => {
            const entity = new NotBlankCustomMessageModel("a");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate number values", () => {
            const entity = new NotBlankCustomMessageModel(0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate boolean values", () => {
            const entity = new NotBlankCustomMessageModel(false);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate non empty object values", () => {
            const entity = new NotBlankCustomMessageModel({ a: 0 });
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate non empty array values", () => {
            const entity = new NotBlankCustomMessageModel([0]);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error with blank strings", () => {
            const entity = new NotBlankCustomMessageModel("\n\t ");
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_BLANK_ERRORS.CUSTOM.BLANK_STRING);
        });
        it("Should throw an error with empty arrays", () => {
            const entity = new NotBlankCustomMessageModel([]);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_BLANK_ERRORS.CUSTOM.EMPTY_ARRAY);
        });
        it("Should throw an error with empty objects", () => {
            const entity = new NotBlankCustomMessageModel({});
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_BLANK_ERRORS.CUSTOM.EMPTY_OBJECT);
        });
        it("Should throw an error with null values", () => {
            const entity = new NotBlankCustomMessageModel(null);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_BLANK_ERRORS.CUSTOM.NULL);
        });
        it("Should throw an error with undefined values", () => {
            const entity = new NotBlankCustomMessageModel(undefined);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_BLANK_ERRORS.CUSTOM.UNDEFINED);
        });
    });
});
