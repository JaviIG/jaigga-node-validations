import { InLengthRange } from "../../../../src/index";

export class InLengthRangeStaticModel {
    @InLengthRange({ min: 3, max: 5, optional: true, trim: true })
    public property: string;
    constructor(property: string) {
        this.property = property;
    }
}
