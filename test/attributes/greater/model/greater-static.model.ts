import { Greater } from "../../../../src/index";

export class GreaterStaticModel {
    @Greater({ min: 0, optional: true })
    public property: number;
    constructor(property: number) {
        this.property = property;
    }
}
