import { Email } from "../../../../src/index";

export class EmailCustomMessageModel {
    @Email({ msgKey: "test-email" })
    public property: string;
    constructor(property: string) {
        this.property = property;
    }
}