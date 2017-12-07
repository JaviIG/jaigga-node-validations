export const REGEX_ERRORS = {
    DEFAULT: {
        NOT_VALID:
            { property: [{ key: "regex", params: { field: "property", value: "wolf", regex: /(donkey|monkey)/.toString() } }] },
    },
    CUSTOM: {
        NOT_VALID:
            { property: [{ key: "test-regex", params: { field: "property", value: "cow", regex: /(donkey|monkey)/.toString() } }] },
        UNDEFINED:
            { property: [{ key: "test-regex", params: { field: "property", value: undefined, regex: /(donkey|monkey)/.toString() } }] },
        NULL:
            { property: [{ key: "test-regex", params: { field: "property", value: null, regex: /(donkey|monkey)/.toString() } }] },
    },
}