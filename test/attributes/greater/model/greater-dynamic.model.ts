import { Greater } from "../../../../src/index";

export class GreaterDynamicModel {
    @Greater({ min: (self: GreaterDynamicModel) => self.min, msgKey: "test-dynamic-greater" })
    public property: number;
    public min: number;

    constructor(property: number, min: number) {
        this.property = property;
        this.min = min;
    }
}
