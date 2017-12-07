import { MatchesRegex } from "../../../../src/index";

export class RegexModel {
    @MatchesRegex({ regex: /(donkey|monkey)/, optional: true })
    public property: string;
    constructor(property: string) {
        this.property = property;
    }
}