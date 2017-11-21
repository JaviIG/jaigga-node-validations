"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_REGEX = {
    "regex": /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "descriptionKey": "regex-email"
};
exports.PHONE_REGEX = {
    "regex": /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
    "descriptionKey": "regex-phone"
};
exports.ISBN13_REGEX = {
    "regex": /^(ISBN-13-)[0-9]{3}(-)[0-9]{2}(-)[0-9]{4}(-)[0-9]{3}(-)[0-9]{1}$/,
    "descriptionKey": "regex-isbn-13"
};
