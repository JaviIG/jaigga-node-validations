import { Min } from "../../../../src/index";

export class MinStaticModel {
    @Min({ min: 0, optional: true })
    public property: number;
    constructor(property: number) {
        this.property = property;
    }
}
