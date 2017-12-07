import { expect } from "chai";
import { doValidationSuccess, doValidationWithErrors } from "../../util/validator.model";
import { RegexCustomMessageModel } from "./model/regex-custom-message.model";
import { RegexModel } from "./model/regex.model";
import { REGEX_ERRORS } from "./regex.mock";

describe("@Email", () => {
    describe("Default, optional", () => {
        it("validate an string when it matches the regex.", () => {
            const entity = new RegexModel("donkey");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when optional and undefined.", () => {
            const entity = new RegexModel(undefined);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when optional and null.", () => {
            const entity = new RegexModel(null);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error if the string is not a valid e-mail address", () => {
            const entity = new RegexModel("wolf");
            expect(doValidationWithErrors(entity)).to.be.deep.equal(REGEX_ERRORS.DEFAULT.NOT_VALID);
        });
    });
    describe("Custom message", () => {
        it("Should validate an string when it matches the regex.", () => {
            const entity = new RegexCustomMessageModel("monkey");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error when not optional and undefined.", () => {
            const entity = new RegexCustomMessageModel(undefined);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(REGEX_ERRORS.CUSTOM.UNDEFINED);
        });
        it("Should throw an error when not optional and null.", () => {
            const entity = new RegexCustomMessageModel(null);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(REGEX_ERRORS.CUSTOM.NULL);
        });
        it("Should throw an error if the string does not match the regex.", () => {
            const entity = new RegexCustomMessageModel("cow");
            expect(doValidationWithErrors(entity)).to.be.deep.equal(REGEX_ERRORS.CUSTOM.NOT_VALID);
        });
    });
});