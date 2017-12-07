import { expect } from "chai";
import { doValidationSuccess, doValidationWithErrors } from "../../util/validator.model";
import { EmailModel } from "./model/email.model";
import { EmailCustomMessageModel } from "./model/email-custom-message.model";
import { EMAIL_ERRORS } from "./email.mock";

describe("@Email", () => {
    describe("Default, optional", () => {
        it("Should validate e-mail addresses.", () => {
            const entity = new EmailModel("user@domain.com");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when optional and undefined.", () => {
            const entity = new EmailModel(undefined);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should NOT throw an error when optional and null.", () => {
            const entity = new EmailModel(null);
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error if the string is not a valid e-mail address", () => {
            const entity = new EmailModel("@.com");
            expect(doValidationWithErrors(entity)).to.be.deep.equal(EMAIL_ERRORS.DEFAULT.NOT_VALID);
        });
    });
    describe("Custom message", () => {
        it("Should validate e-mail addresses.", () => {
            const entity = new EmailCustomMessageModel("user@domain.com");
            expect(doValidationSuccess(entity)).to.be.equal(undefined);
        });
        it("Should throw an error when not optional and undefined.", () => {
            const entity = new EmailCustomMessageModel(undefined);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(EMAIL_ERRORS.CUSTOM.UNDEFINED);
        });
        it("Should throw an error when not optional and null.", () => {
            const entity = new EmailCustomMessageModel(null);
            expect(doValidationWithErrors(entity)).to.be.deep.equal(EMAIL_ERRORS.CUSTOM.NULL);
        });
        it("Should throw an error if the string not a valid e-mail address", () => {
            const entity = new EmailCustomMessageModel("user@.com");
            expect(doValidationWithErrors(entity)).to.be.deep.equal(EMAIL_ERRORS.CUSTOM.NOT_VALID);
        });
    });
});