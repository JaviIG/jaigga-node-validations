import { InValues } from "../../../../src/index";

export class InValuesStaticModel {
    @InValues({ allowedValues: ["0", 1, true, { a: 1 }, [1, 2], undefined] })
    public property: any;
    constructor(property: any) {
        this.property = property;
    }
}
