export const NOT_EMPTY_ERRORS = {
    DEFAULT: {
        BLANK_STRING: { property: [{ key: "not-empty", params: { field: "property", value: "\n\t " } }] },
        EMPTY_ARRAY: { property: [{ key: "not-empty", params: { field: "property", value: [] } }] },
        EMPTY_OBJECT: { property: [{ key: "not-empty", params: { field: "property", value: {} } }] },
    },
    CUSTOM: {
        BLANK_STRING: { property: [{ key: "test-not-empty", params: { field: "property", value: "\n\t " } }] },
        EMPTY_ARRAY: { property: [{ key: "test-not-empty", params: { field: "property", value: [] } }] },
        EMPTY_OBJECT: { property: [{ key: "test-not-empty", params: { field: "property", value: {} } }] },
    },
};
