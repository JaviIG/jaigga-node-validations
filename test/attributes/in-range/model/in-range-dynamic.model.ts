import { InRange } from "../../../../src/index";

export class InRangeDynamicModel {
    @InRange({ min: (self: InRangeDynamicModel) => self.min, max: (self: InRangeDynamicModel) => self.max, msgKey: "test-dynamic-in-range" })
    public property: number;
    public min: number;
    public max: number;

    constructor(property: number, min: number, max: number) {
        this.property = property;
        this.min = min;
        this.max = max;
    }
}
