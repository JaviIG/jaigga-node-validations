import { MaxLength } from "../../../../src/index";

export class MaxLengthDynamicModel {
    @MaxLength({ max: (self: MaxLengthDynamicModel) => self.max, msgKey: "test-dynamic-max-length" })
    public property: string;
    public max: number;

    constructor(property: string, max: number) {
        this.property = property;
        this.max = max;
    }
}
