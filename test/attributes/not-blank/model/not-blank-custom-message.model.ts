import { NotBlank } from "../../../../src/index";

export class NotBlankCustomMessageModel {
    @NotBlank({ msgKey: "test-not-blank" })
    public property: any;
    constructor(property: any) {
        this.property = property;
    }
}
