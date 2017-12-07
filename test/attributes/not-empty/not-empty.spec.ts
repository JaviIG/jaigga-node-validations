import { expect } from "chai";
import { doValidationSuccess, doValidationWithErrors } from "../../util/validator.model";
import { NotEmptyCustomMessageModel } from "./model/not-empty-custom-message.model";
import { NotEmptyModel } from "./model/not-empty.model";
import { NOT_EMPTY_ERRORS } from "./not-empty.mock";

describe("@NotEmpty", () => {
    describe("Default", () => {
        it("Should validate null values", () => {
            const entity = new NotEmptyModel(null);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate undefined values", () => {
            const entity = new NotEmptyModel(undefined);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate string values.", () => {
            const entity = new NotEmptyModel("a");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate number values", () => {
            const entity = new NotEmptyModel(0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate boolean values", () => {
            const entity = new NotEmptyModel(false);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate non empty object values", () => {
            const entity = new NotEmptyModel({ a: 0 });
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate non empty array values", () => {
            const entity = new NotEmptyModel([0]);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error with blank strings", () => {
            const entity = new NotEmptyModel("\n\t ");
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_EMPTY_ERRORS.DEFAULT.BLANK_STRING);
        });
        it("Should throw an error with empty arrays", () => {
            const entity = new NotEmptyModel([]);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_EMPTY_ERRORS.DEFAULT.EMPTY_ARRAY);
        });
        it("Should throw an error with empty objects", () => {
            const entity = new NotEmptyModel({});
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_EMPTY_ERRORS.DEFAULT.EMPTY_OBJECT);
        });
    });
    describe("Custom message", () => {
        it("Should validate null values", () => {
            const entity = new NotEmptyCustomMessageModel(null);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate undefined values", () => {
            const entity = new NotEmptyCustomMessageModel(undefined);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate string values.", () => {
            const entity = new NotEmptyCustomMessageModel("a");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate number values", () => {
            const entity = new NotEmptyCustomMessageModel(0);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate boolean values", () => {
            const entity = new NotEmptyCustomMessageModel(false);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate non empty object values", () => {
            const entity = new NotEmptyCustomMessageModel({ a: 0 });
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should validate non empty array values", () => {
            const entity = new NotEmptyCustomMessageModel([0]);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error with blank strings", () => {
            const entity = new NotEmptyCustomMessageModel("\n\t ");
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_EMPTY_ERRORS.CUSTOM.BLANK_STRING);
        });
        it("Should throw an error with empty arrays", () => {
            const entity = new NotEmptyCustomMessageModel([]);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_EMPTY_ERRORS.CUSTOM.EMPTY_ARRAY);
        });
        it("Should throw an error with empty objects", () => {
            const entity = new NotEmptyCustomMessageModel({});
            expect(doValidationWithErrors(entity)).to.be.deep.equal(NOT_EMPTY_ERRORS.CUSTOM.EMPTY_OBJECT);
        });
    });
});
