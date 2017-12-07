export const NOT_NULL_ERRORS = {
    DEFAULT: {
        UNDEFINED: { property: [{ key: "not-null", params: { field: "property", value: undefined } }] },
        NULL: { property: [{ key: "not-null", params: { field: "property", value: null } }] },
    },
    CUSTOM: {
        UNDEFINED: { property: [{ key: "test-not-null", params: { field: "property", value: undefined } }] },
        NULL: { property: [{ key: "test-not-null", params: { field: "property", value: null } }] },
    },
};
