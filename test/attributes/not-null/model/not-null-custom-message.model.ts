import { NotNull } from "../../../../src/index";

export class NotNullCustomMessageModel {
    @NotNull({ msgKey: "test-not-null" })
    public property: any;
    constructor(property: any) {
        this.property = property;
    }
}
