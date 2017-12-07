export const MAX_ERRORS = {
    STATIC_OPTIONAL: {
        BIGGER: { property: [{ key: "max", params: { field: "property", value: 0.0000000001, max: 0 } }] },
    },
    DYNAMIC_CUSTOM_ERROR: {
        UNDEFINED:
            { property: [{ key: "test-dynamic-max", params: { field: "property", value: undefined, max: 0 } }] },
        NULL:
            { property: [{ key: "test-dynamic-max", params: { field: "property", value: null, max: 0 } }] },
        BIGGER:
            { property: [{ key: "test-dynamic-max", params: { field: "property", value: 0.0000000001, max: 0 } }] },
        AFTER_UPDATE_TO_SMALLER:
            { property: [{ key: "test-dynamic-max", params: { field: "property", value: 0, max: -1 } }] },
        BEFORE_UPDATE_TO_BIGGER:
            { property: [{ key: "test-dynamic-max", params: { field: "property", value: 0.0000000001, max: 0 } }] },
    },
};
