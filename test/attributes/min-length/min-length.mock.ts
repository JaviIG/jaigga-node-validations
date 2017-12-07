export const MIN_LENGTH_ERRORS = {
    STATIC_OPTIONAL: {
        SMALLER: { property: [{ key: "min-length", params: { "field": "property", "value": "  1  ", "min-length": 3 } }] },
        BLANK: { property: [{ key: "min-length", params: { "field": "property", "value": "\n\t \n\t \n\t ", "min-length": 3 } }] },
    },
    DYNAMIC_CUSTOM_ERROR: {
        UNDEFINED:
            { property: [{ key: "test-dynamic-min-length", params: { "field": "property", "value": undefined, "min-length": 3 } }] },
        NULL:
            { property: [{ key: "test-dynamic-min-length", params: { "field": "property", "value": null, "min-length": 3 } }] },
        SMALLER:
            { property: [{ key: "test-dynamic-min-length", params: { "field": "property", "value": "12", "min-length": 3 } }] },
        AFTER_UPDATE_TO_BIGGER:
            { property: [{ key: "test-dynamic-min-length", params: { "field": "property", "value": "123", "min-length": 5 } }] },
        BEFORE_UPDATE_TO_SMALLER:
            { property: [{ key: "test-dynamic-min-length", params: { "field": "property", "value": "123", "min-length": 5 } }] },
    },
};
