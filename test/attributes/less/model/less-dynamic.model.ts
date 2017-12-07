import { Less } from "../../../../src/index";

export class LessDynamicModel {
    @Less({ max: (self: LessDynamicModel) => self.max, msgKey: "test-dynamic-less" })
    public property: number;
    public max: number;

    constructor(property: number, max: number) {
        this.property = property;
        this.max = max;
    }
}
