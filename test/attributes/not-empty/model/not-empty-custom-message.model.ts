import { NotEmpty } from "../../../../src/index";

export class NotEmptyCustomMessageModel {
    @NotEmpty({ msgKey: "test-not-empty" })
    public property: any;
    constructor(property: any) {
        this.property = property;
    }
}
