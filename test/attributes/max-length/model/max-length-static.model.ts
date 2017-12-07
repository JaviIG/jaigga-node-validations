import { MaxLength } from "../../../../src/index";

export class MaxLengthStaticModel {
    @MaxLength({ max: 5, optional: true, trim: true })
    public property: string;
    constructor(property: string) {
        this.property = property;
    }
}
