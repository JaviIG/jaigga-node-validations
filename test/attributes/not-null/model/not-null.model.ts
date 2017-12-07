import { NotNull } from "../../../../src/index";

export class NotNullModel {
    @NotNull()
    public property: any;
    constructor(property: any) {
        this.property = property;
    }
}
