import { Max } from "../../../../src/index";

export class MaxStaticModel {
    @Max({ max: 0, optional: true })
    public property: number;
    constructor(property: number) {
        this.property = property;
    }
}
