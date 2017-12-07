export const MAX_ERRORS = {
    STATIC_OPTIONAL: {
        BIGGER: { property: [{ key: "max-length", params: { "field": "property", "value": "12  56", "max-length": 5 } }] },
        BLANK: { property: [{ key: "max-length", params: { "field": "property", "value": "1\n\t \n\t \n\t 1", "max-length": 5 } }] },
    },
    DYNAMIC_CUSTOM_ERROR: {
        UNDEFINED:
            { property: [{ key: "test-dynamic-max-length", params: { "field": "property", "value": undefined, "max-length": 5 } }] },
        NULL:
            { property: [{ key: "test-dynamic-max-length", params: { "field": "property", "value": null, "max-length": 5 } }] },
        BIGGER:
            { property: [{ key: "test-dynamic-max-length", params: { "field": "property", "value": "123456", "max-length": 5 } }] },
        AFTER_UPDATE_TO_SMALLER:
            { property: [{ key: "test-dynamic-max-length", params: { "field": "property", "value": "1234", "max-length": 3 } }] },
        BEFORE_UPDATE_TO_BIGGER:
            { property: [{ key: "test-dynamic-max-length", params: { "field": "property", "value": "1234", "max-length": 3 } }] },
    },
};
