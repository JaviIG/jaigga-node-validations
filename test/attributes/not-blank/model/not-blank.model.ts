import { NotBlank } from "../../../../src/index";

export class NotBlankModel {
    @NotBlank()
    public property: any;
    constructor(property: any) {
        this.property = property;
    }
}
