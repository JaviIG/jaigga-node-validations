import { NotEmpty } from "../../../../src/index";

export class NotEmptyModel {
    @NotEmpty()
    public property: any;
    constructor(property: any) {
        this.property = property;
    }
}
