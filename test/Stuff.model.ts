import { required, min, max, minLength, maxLength } from '../src/index';

export const DATA = {
    "req": {
        "validStr": "REQUIRED",
        "validObj": {},
        "validNum": 0,
        "invalidUndefined": undefined,
        "invalidNull": null,
        "invalidEmpty": "",
        "invalidSpace": " ",
    },
    "num": {
        "validNum1": 0,
        "validNum2": 0,
        "invalidNumberLess": -0.000000000001,
        "invalidNumberGreater": 10.000000000001
    },
    "str": {
        "validStr1": "0",
        "validStr2": "1234567890",
        "validStr3": " ",
        "invalidNumberLess": "12345678901",
        "invalidNumberGreater": ""
    }
}
export class Stuff {
    @required()
    public req: any;

    @min(0)
    @max(10)
    public num: number;

    @minLength(10)
    @maxLength(20)
    public str: string;

    constructor(req: any, num: number, str: string) {
        this.req = req;
        this.num = num;
        this.str = str;
    }
}