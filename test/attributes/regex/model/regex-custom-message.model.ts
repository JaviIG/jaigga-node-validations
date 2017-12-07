import { MatchesRegex } from "../../../../src/index";

export class RegexCustomMessageModel {
    @MatchesRegex({ regex: /(donkey|monkey)/, msgKey: "test-regex" })
    public property: string;
    constructor(property: string) {
        this.property = property;
    }
}