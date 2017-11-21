import { Stuff, DATA } from './Stuff.model';
import { expect } from 'chai';

describe("Validations", () => {
    describe("@required", () => {
        it("Should have 'req' key in 'errors' object when @required attribute is undefined", () => {
            const stuff = new Stuff(DATA.req.validStr, DATA.num.validNum1, DATA.str.validStr1);
            const errors = Reflect.getMetadata("errors", stuff);
            expect(errors).to.have.keys(["req"]);
            expect(errors.req).to.have.length(1);
        });
    })
});