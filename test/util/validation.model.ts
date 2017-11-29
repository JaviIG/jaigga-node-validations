import { notNull, notEmpty, notBlank, min, max, minLength, maxLength, email, hasRegex, EMAIL_REGEX, inValues } from '../../src/index';

export class NotNullValidation {
    @notNull()
    public str: string;

    @notNull()
    public num: number;

    @notNull()
    public arr: any[];

    @notNull()
    public obj: any;

    constructor(str: string, num: number, arr: any[], obj: any) {
        this.obj = obj;
        this.arr = arr;
        this.str = str;
        this.num = num;
    }
}

export class NotEmptyValidation {
    @notEmpty()
    public str: string;

    @notEmpty()
    public num: number;

    @notEmpty()
    public arr: any[];

    @notEmpty()
    public obj: any;

    constructor(str: string, num: number, arr: any[], obj: any) {
        this.obj = obj;
        this.arr = arr;
        this.str = str;
        this.num = num;
    }
}

export class NotBlankValidation {
    @notBlank()
    public str: string;

    @notBlank()
    public num: number;

    @notBlank()
    public arr: any[];

    @notBlank()
    public obj: any;

    constructor(str: string, num: number, arr: any[], obj: any) {
        this.obj = obj;
        this.arr = arr;
        this.str = str;
        this.num = num;
    }
}

export class MinMaxValidation {
    @min(0)
    public minInclude: number;

    @max(0)
    public maxInclude: number;

    @min(0, true)
    public minExclude: number;

    @max(0, true)
    public maxExclude: number;

    @min(0, false, true)
    @max(10, false, true)
    public minmax: number;

    constructor(minInclude: number, maxInclude: number, minExclude: number, maxExclude: number, minmax: number) {
        this.minInclude = minInclude;
        this.maxInclude = maxInclude;
        this.minExclude = minExclude;
        this.maxExclude = maxExclude;
        this.minmax = minmax;
    }
}
export class MinLengthMaxLengthValidation {
    @minLength(1)
    minLength: string;
    @maxLength(5)
    maxLength: string;

    @minLength(1, true)
    @maxLength(5, true)
    both: string;

    constructor(minLength: string, maxLength: string, both: string) {
        this.minLength = minLength;
        this.maxLength = maxLength;
        this.both = both;
    }
}

export class RegexValidation {

    @hasRegex({ "regex": /(donkey|monkey)/, "descriptionKey": 'regex-donkey-or-monkey' }, true)
    regex: string;

    @email()
    email: string;

    constructor(regex: string, email: string) {
        this.regex = regex;
        this.email = email;
    }
}

export class InValuesValidation {
    public static STR_VALUES: string[] = ["1", "2", "3", null];
    public static NUM_VALUES: number[] = [1, 2, 3, undefined];
    public static ARR_VALUES: any[][] = [[{ "a": "1" }], [{ "b": "2" }], null];
    public static OBJ_VALUES: any[] = [{ "a": ["1", "2"] }, { "b": ["3", "4"] }, undefined];

    @inValues(InValuesValidation.STR_VALUES)
    public str: string;

    @inValues(InValuesValidation.NUM_VALUES)
    public num: number;

    @inValues(InValuesValidation.ARR_VALUES)
    public arr: any[];

    @inValues(InValuesValidation.OBJ_VALUES)
    public obj: any;

    constructor(str: string, num: number, arr: any[], obj: any) {
        this.obj = obj;
        this.arr = arr;
        this.str = str;
        this.num = num;
    }
}

export class ServerRequestValidation {
    public static fromJson(json: any) {
        if (json !== undefined) {
            return new ServerRequestValidation(json.rating);
        } else {
            return new ServerRequestValidation(undefined);
        }
    }

    @min(0, false, false, "min-rating")
    @max(10)
    public rating: number;

    constructor(rating: number) {
        this.rating = rating;
    }
}