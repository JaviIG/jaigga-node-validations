import { Less } from "../../../../src/index";

export class LessStaticModel {
    @Less({ max: 0, optional: true })
    public property: number;
    constructor(property: number) {
        this.property = property;
    }
}
