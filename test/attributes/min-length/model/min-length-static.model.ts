import { MinLength } from "../../../../src/index";

export class MinLengthStaticModel {
    @MinLength({ min: 3, optional: true, trim: true })
    public property: string;
    constructor(property: string) {
        this.property = property;
    }
}
