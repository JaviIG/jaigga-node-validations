export const IN_RANGE_ERRORS = {
    STATIC_OPTIONAL: {
        SMALLER:
            { property: [{ key: "in-range", params: { field: "property", value: -0.0000000001, min: 0, max: 10 } }] },
        BIGGER:
            { property: [{ key: "in-range", params: { field: "property", value: 10.0000000001, min: 0, max: 10 } }] },
    },
    DYNAMIC_CUSTOM_MESSAGE: {
        SMALLER:
            { property: [{ key: "test-dynamic-in-range", params: { field: "property", value: -0.0000000001, min: 0, max: 10 } }] },
        BIGGER:
            { property: [{ key: "test-dynamic-in-range", params: { field: "property", value: 10.0000000001, min: 0, max: 10 } }] },
        BEFORE_UPDATE_MIN_TO_SMALLER:
            { property: [{ key: "test-dynamic-in-range", params: { field: "property", value: 5, min: 6, max: 10 } }] },
        AFTER_UPDATE_MIN_TO_BIGGER:
            { property: [{ key: "test-dynamic-in-range", params: { field: "property", value: 5, min: 6, max: 10 } }] },
        BEFORE_UPDATE_MAX_TO_BIGGER:
            { property: [{ key: "test-dynamic-in-range", params: { field: "property", value: 5, min: 0, max: 4 } }] },
        AFTER_UPDATE_MAX_TO_SMALLER:
            { property: [{ key: "test-dynamic-in-range", params: { field: "property", value: 5, min: 0, max: 4 } }] },
        UNDEFINED:
            { property: [{ key: "test-dynamic-in-range", params: { field: "property", value: undefined, min: 0, max: 10 } }] },
        NULL:
            { property: [{ key: "test-dynamic-in-range", params: { field: "property", value: null, min: 0, max: 10 } }] },
    },
};
