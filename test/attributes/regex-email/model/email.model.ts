import { Email } from "../../../../src/index";

export class EmailModel {
    @Email({ optional: true })
    public property: string;
    constructor(property: string) {
        this.property = property;
    }
}