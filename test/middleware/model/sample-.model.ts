import { Max, Min } from "../../../src/index";

export class SampleModel {
    public static fromJson(json: any) {
        if (json !== undefined) {
            return new SampleModel(json.rating);
        } else {
            return new SampleModel(undefined);
        }
    }

    @Min({ min: 0, msgKey: "min-rating" })
    @Max({ max: 10 })
    public rating: number;

    constructor(rating: number) {
        this.rating = rating;
    }
}
