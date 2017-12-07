import { MinLength } from "../../../../src/index";

export class MinLengthDynamicModel {
    @MinLength({ min: (self: MinLengthDynamicModel) => self.min, msgKey: "test-dynamic-min-length" })
    public property: string;
    public min: number;

    constructor(property: string, min: number) {
        this.property = property;
        this.min = min;
    }
}
