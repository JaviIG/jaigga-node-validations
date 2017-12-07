import { Max } from "../../../../src/index";

export class MaxDynamicModel {
    @Max({ max: (self: MaxDynamicModel) => self.max, msgKey: "test-dynamic-max" })
    public property: number;
    public max: number;

    constructor(property: number, max: number) {
        this.property = property;
        this.max = max;
    }
}
