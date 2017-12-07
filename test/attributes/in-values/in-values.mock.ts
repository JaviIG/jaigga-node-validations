export const IN_VALUES_ERRORS = {
    STATIC: {
        NOT_IN_VALUES:
            { property: [{ key: "in-values", params: { "field": "property", "value": false, "allowed-values": ["0", 1, true, { a: 1 }, [1, 2], undefined] } }] },
        NULL:
            { property: [{ key: "in-values", params: { "field": "property", "value": null, "allowed-values": ["0", 1, true, { a: 1 }, [1, 2], undefined] } }] },
    },
    DYNAMIC_CUSTOM_ERROR: {
        UNDEFINED:
            { property: [{ key: "test-dynamic-in-values", params: { "field": "property", "value": undefined, "allowed-values": ["0", 1, true, { a: 1 }, [1, 2], null] } }] },
        NOT_IN_VALUES:
            { property: [{ key: "test-dynamic-in-values", params: { "field": "property", "value": false, "allowed-values": ["0", 1, true, { a: 1 }, [1, 2], null] } }] },
        BEFORE_ADD:
            { property: [{ key: "test-dynamic-in-values", params: { "field": "property", "value": { b: 2 }, "allowed-values": ["0", 1, true, { a: 1 }, [1, 2], null] } }] },
        AFTER_REMOVE:
            { property: [{ key: "test-dynamic-in-values", params: { "field": "property", "value": "0", "allowed-values": [1, true, { a: 1 }, [1, 2], null] } }] },
    },
};
