import { Validate, Valid } from "../../src/index";

class Validator {

    @Validate()
    validate( @Valid() something: any) {
        //My only proposit is to validate the stuff entity
    }
}

export const validator = new Validator();