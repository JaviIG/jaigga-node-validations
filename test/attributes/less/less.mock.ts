export const LESS_ERRORS = {
    STATIC_OPTIONAL: {
        BIGGER:
            { property: [{ key: "less", params: { field: "property", value: 0.0000000001, max: 0 } }] },
        EQUAL:
            { property: [{ key: "less", params: { field: "property", value: 0, max: 0 } }] },
    },
    DYNAMIC_CUSTOM_MESSAGE: {
        UNDEFINED:
            { property: [{ key: "test-dynamic-less", params: { field: "property", value: undefined, max: 0 } }] },
        NULL:
            { property: [{ key: "test-dynamic-less", params: { field: "property", value: null, max: 0 } }] },
        BIGGER:
            { property: [{ key: "test-dynamic-less", params: { field: "property", value: 0.0000000001, max: 0 } }] },
        EQUAL:
            { property: [{ key: "test-dynamic-less", params: { field: "property", value: 0, max: 0 } }] },
        AFTER_UPDATE_TO_SMALLER:
            { property: [{ key: "test-dynamic-less", params: { field: "property", value: -1, max: -1 } }] },
        BEFORE_UPDATE_TO_BIGGER:
            { property: [{ key: "test-dynamic-less", params: { field: "property", value: 0, max: 0 } }] },

    }
};
