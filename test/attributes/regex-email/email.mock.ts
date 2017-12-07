import { EMAIL_REGEX } from "../../../src/index";
export const EMAIL_ERRORS = {
    DEFAULT: {
        NOT_VALID: { property: [{ key: "regex-email", params: { field: "property", value: "@.com", regex: EMAIL_REGEX.toString() } }] },
    },
    CUSTOM: {
        NOT_VALID: { property: [{ key: "test-email", params: { field: "property", value: "user@.com", regex: EMAIL_REGEX.toString() } }] },
        UNDEFINED: { property: [{ key: "test-email", params: { field: "property", value: undefined, regex: EMAIL_REGEX.toString() } }] },
        NULL: { property: [{ key: "test-email", params: { field: "property", value: null, regex: EMAIL_REGEX.toString() } }] },
    },
}
