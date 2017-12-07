export const NOT_BLANK_ERRORS = {
    DEFAULT: {
        UNDEFINED: { property: [{ key: "not-blank", params: { field: "property", value: undefined } }] },
        NULL: { property: [{ key: "not-blank", params: { field: "property", value: null } }] },
        BLANK_STRING: { property: [{ key: "not-blank", params: { field: "property", value: "\n\t " } }] },
        EMPTY_ARRAY: { property: [{ key: "not-blank", params: { field: "property", value: [] } }] },
        EMPTY_OBJECT: { property: [{ key: "not-blank", params: { field: "property", value: {} } }] },
    },
    CUSTOM: {
        UNDEFINED: { property: [{ key: "test-not-blank", params: { field: "property", value: undefined } }] },
        NULL: { property: [{ key: "test-not-blank", params: { field: "property", value: null } }] },
        BLANK_STRING: { property: [{ key: "test-not-blank", params: { field: "property", value: "\n\t " } }] },
        EMPTY_ARRAY: { property: [{ key: "test-not-blank", params: { field: "property", value: [] } }] },
        EMPTY_OBJECT: { property: [{ key: "test-not-blank", params: { field: "property", value: {} } }] },
    },
};
