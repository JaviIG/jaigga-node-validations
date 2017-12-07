import { InLengthRange } from "../../../../src/index";

export class InLengthRangeDynamicModel {
    @InLengthRange({ min: (self: InLengthRangeDynamicModel) => self.min, max: (self: InLengthRangeDynamicModel) => self.max, msgKey: "test-dynamic-in-length-range" })
    public property: string;
    public min: number;
    public max: number;

    constructor(property: string, min: number, max: number) {
        this.property = property;
        this.min = min;
        this.max = max;
    }
}
