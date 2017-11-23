import { ERRORS } from './../src/variables';
import { Stuff, DATA } from './Stuff.model';
import { expect } from 'chai';
import { valid, validate } from '../src/index';
import { ValidationError } from '../src/validation/validation-error';

class Validator {

    @validate()
    validate( @valid() stuff: Stuff) {
        //My only proposit is to validate the stuff entity
    }
}

describe("Validations", () => {
    const validator: Validator = new Validator();
    describe("@required", () => {
        it("Should have 'req' key in 'errors' object when @required attribute is undefined", () => {
            const stuff = new Stuff(DATA.req.invalidUndefined, DATA.num.validNum1, DATA.str.validStr1);
            validator.validate(stuff);
            expect(() => validator.validate(stuff)).to.throw(ValidationError);
            const errors = Reflect.getOwnMetadata(ERRORS, stuff);
            expect(errors).to.have.keys(["req"]);
            expect(errors.req).to.have.length(1);
        });
        it("Should have 'req' key in 'errors' object when @required attribute is null", () => {
            const stuff = new Stuff(DATA.req.invalidNull, DATA.num.validNum1, DATA.str.validStr1);

            expect(() => validator.validate(stuff)).to.throw(ValidationError);
            const errors = Reflect.getOwnMetadata(ERRORS, stuff);
            expect(errors).to.have.keys(["req"]);
            expect(errors.req).to.have.length(1);
        });
        it("Should have 'req' key in 'errors' object when @required attribute is empty", () => {
            const stuff = new Stuff(DATA.req.invalidEmpty, DATA.num.validNum1, DATA.str.validStr1);

            expect(() => validator.validate(stuff)).to.throw(ValidationError);
            const errors = Reflect.getOwnMetadata(ERRORS, stuff);
            expect(errors).to.have.keys(["req"]);
            expect(errors.req).to.have.length(1);
        });
    })
});