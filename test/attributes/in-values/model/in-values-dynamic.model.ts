import { InValues } from "../../../../src/index";

export class InValuesDynamicModel {
    @InValues({ allowedValues: (self: InValuesDynamicModel) => self.allowedValues, msgKey: "test-dynamic-in-values" })
    public property: any;
    public allowedValues: any[];

    constructor(property: any, allowedValues: any[]) {
        this.property = property;
        this.allowedValues = allowedValues;
    }
}
