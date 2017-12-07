export const IN_LENGTH_RANGE_ERRORS = {
    STATIC_OPTIONAL: {
        SMALLER:
            { property: [{ key: "in-length-range", params: { "field": "property", "value": "12", "min-length": 3, "max-length": 5 } }] },
        BIGGER:
            { property: [{ key: "in-length-range", params: { "field": "property", "value": "123456", "min-length": 3, "max-length": 5 } }] },
        BLANK:
            { property: [{ key: "in-length-range", params: { "field": "property", "value": "\n\t \n\t \n\t ", "min-length": 3, "max-length": 5 } }] },
    },
    DYNAMIC_CUSTOM_MESSAGE: {
        SMALLER:
            { property: [{ key: "test-dynamic-in-length-range", params: { "field": "property", "value": "12", "min-length": 3, "max-length": 5 } }] },
        BIGGER:
            { property: [{ key: "test-dynamic-in-length-range", params: { "field": "property", "value": "123456", "min-length": 3, "max-length": 5 } }] },
        BEFORE_UPDATE_MIN_TO_SMALLER:
            { property: [{ key: "test-dynamic-in-length-range", params: { "field": "property", "value": "1", "min-length": 3, "max-length": 5 } }] },
        AFTER_UPDATE_MIN_TO_BIGGER:
            { property: [{ key: "test-dynamic-in-length-range", params: { "field": "property", "value": "1", "min-length": 3, "max-length": 5 } }] },
        BEFORE_UPDATE_MAX_TO_BIGGER:
            { property: [{ key: "test-dynamic-in-length-range", params: { "field": "property", "value": "123", "min-length": 0, "max-length": 2 } }] },
        AFTER_UPDATE_MAX_TO_SMALLER:
            { property: [{ key: "test-dynamic-in-length-range", params: { "field": "property", "value": "123", "min-length": 0, "max-length": 2 } }] },
        UNDEFINED:
            { property: [{ key: "test-dynamic-in-length-range", params: { "field": "property", "value": undefined, "min-length": 3, "max-length": 5 } }] },
        NULL:
            { property: [{ key: "test-dynamic-in-length-range", params: { "field": "property", "value": null, "min-length": 3, "max-length": 5 } }] },
    },
};
