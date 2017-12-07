import { Min } from "../../../../src/index";

export class MinDynamicModel {
    @Min({ min: (self: MinDynamicModel) => self.min, msgKey: "test-dynamic-min" })
    public property: number;
    public min: number;

    constructor(property: number, min: number) {
        this.property = property;
        this.min = min;
    }
}
