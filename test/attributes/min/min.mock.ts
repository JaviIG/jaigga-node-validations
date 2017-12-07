export const MIN_ERRORS = {
    STATIC_OPTIONAL: {
        SMALLER: { property: [{ key: "min", params: { field: "property", value: -0.0000000001, min: 0 } }] },
    },
    DYNAMIC_CUSTOM_ERROR: {
        UNDEFINED:
            { property: [{ key: "test-dynamic-min", params: { field: "property", value: undefined, min: 0 } }] },
        NULL:
            { property: [{ key: "test-dynamic-min", params: { field: "property", value: null, min: 0 } }] },
        SMALLER:
            { property: [{ key: "test-dynamic-min", params: { field: "property", value: -0.0000000001, min: 0 } }] },
        AFTER_UPDATE_TO_BIGGER:
            { property: [{ key: "test-dynamic-min", params: { field: "property", value: 0, min: 1 } }] },
        BEFORE_UPDATE_TO_SMALLER:
            { property: [{ key: "test-dynamic-min", params: { field: "property", value: -0.0000000001, min: 0 } }] },
    },
};
