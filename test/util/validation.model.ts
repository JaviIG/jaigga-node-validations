import { NotNull, NotEmpty, NotBlank, Min, Max, MinLength, MaxLength, Email, HasRegex, InValues, Less, Greater, InRange, InLengthRange } from '../../src/index';

export class NotNullValidation {
    @NotNull()
    public str: string;

    @NotNull()
    public num: number;

    @NotNull()
    public arr: any[];

    @NotNull()
    public obj: any;

    constructor(str: string, num: number, arr: any[], obj: any) {
        this.obj = obj;
        this.arr = arr;
        this.str = str;
        this.num = num;
    }
}

export class NotEmptyValidation {
    @NotEmpty()
    public str: string;

    @NotEmpty()
    public num: number;

    @NotEmpty()
    public arr: any[];

    @NotEmpty()
    public obj: any;

    constructor(str: string, num: number, arr: any[], obj: any) {
        this.obj = obj;
        this.arr = arr;
        this.str = str;
        this.num = num;
    }
}

export class NotBlankValidation {
    @NotBlank()
    public str: string;

    @NotBlank()
    public num: number;

    @NotBlank()
    public arr: any[];

    @NotBlank()
    public obj: any;

    constructor(str: string, num: number, arr: any[], obj: any) {
        this.obj = obj;
        this.arr = arr;
        this.str = str;
        this.num = num;
    }
}

export class MinMaxValidation {
    @Min({ "min": 0 })
    public min: number;

    @Max({ "max": 0 })
    public max: number;

    @Greater({ "min": 0 })
    public greater: number;

    @Less({ "max": 0 })
    public less: number;

    @Min({ "min": 0, "optional": true })
    @Max({ "max": 10, "optional": true })
    public minmax: number;

    constructor(min: number, max: number, greater: number, less: number, minmax: number) {
        this.min = min;
        this.max = max;
        this.greater = greater;
        this.less = less;
        this.minmax = minmax;
    }
}
export class InRangeValidation {
    @InRange({ "min": (instance) => instance.dynamicMin, "max": (instance) => instance.dynamicMax })
    public range: number;
    public dynamicMin: number;
    public dynamicMax: number;

    constructor(range: number, dynamicMin: number, dynamicMax: number) {
        this.range = range;
        this.dynamicMax = dynamicMax;
        this.dynamicMin = dynamicMin;
    }
}
export class MinLengthMaxLengthValidation {
    @MinLength({ "min": 1 })
    minLength: string;
    @MaxLength({ "max": 5 })
    maxLength: string;

    @MinLength({ "min": 1, "optional": true })
    @MaxLength({ "max": 5, "optional": true })
    both: string;

    constructor(minLength: string, maxLength: string, both: string) {
        this.minLength = minLength;
        this.maxLength = maxLength;
        this.both = both;
    }
}

export class InLengthRangeValidation {
    @InLengthRange({ "min": (instance) => instance.dynamicMin, "max": (instance) => instance.dynamicMax })
    public range: string;
    public dynamicMin: number;
    public dynamicMax: number;

    constructor(range: string, dynamicMin: number, dynamicMax: number) {
        this.range = range;
        this.dynamicMax = dynamicMax;
        this.dynamicMin = dynamicMin;
    }
}

export class RegexValidation {

    @HasRegex({ "regex": /(donkey|monkey)/, "msgKey": 'regex-donkey-or-monkey', "optional": true })
    regex: string;

    @Email()
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

    @InValues({ "allowedValues": InValuesValidation.STR_VALUES })
    public str: string;

    @InValues({ "allowedValues": InValuesValidation.NUM_VALUES })
    public num: number;

    @InValues({ "allowedValues": InValuesValidation.ARR_VALUES })
    public arr: any[];

    @InValues({ "allowedValues": InValuesValidation.OBJ_VALUES })
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

    @Min({ "min": 0, "msgKey": "min-rating" })
    @Max({ "max": 10 })
    public rating: number;

    constructor(rating: number) {
        this.rating = rating;
    }
}