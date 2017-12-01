import { validate, valid } from "../../src/index";

class Validator {

    @validate()
    validate( @valid() something: any) {
        //My only proposit is to validate the stuff entity
    }
}

export const validator = new Validator();