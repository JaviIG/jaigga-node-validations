export const GREATER_ERRORS = {
    STATIC_OPTIONAL: {
        SMALLER:
            { property: [{ key: "greater", params: { field: "property", value: -0.0000000001, min: 0 } }] },
        EQUAL:
            { property: [{ key: "greater", params: { field: "property", value: 0, min: 0 } }] },
    },
    DYNAMIC_CUSTOM_MESSAGE: {
        UNDEFINED:
            { property: [{ key: "test-dynamic-greater", params: { field: "property", value: undefined, min: 0 } }] },
        NULL:
            { property: [{ key: "test-dynamic-greater", params: { field: "property", value: null, min: 0 } }] },
        SMALLER:
            { property: [{ key: "test-dynamic-greater", params: { field: "property", value: -0.0000000001, min: 0 } }] },
        EQUAL:
            { property: [{ key: "test-dynamic-greater", params: { field: "property", value: 0, min: 0 } }] },
        AFTER_UPDATE_TO_BIGGER:
            { property: [{ key: "test-dynamic-greater", params: { field: "property", value: 1, min: 1 } }] },
        BEFORE_UPDATE_TO_SMALLER:
            { property: [{ key: "test-dynamic-greater", params: { field: "property", value: 0, min: 0 } }] },
    }
};
