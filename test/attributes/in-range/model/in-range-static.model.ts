import { InRange } from "../../../../src/index";

export class InRangeStaticModel {
    @InRange({ min: 0, max: 10, optional: true })
    public property: number;
    constructor(property: number) {
        this.property = property;
    }
}
