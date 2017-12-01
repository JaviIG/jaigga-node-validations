import { InValuesValidation } from "./validation.model";
import { EMAIL_REGEX } from "../../src/index";

//Errors mocks
export const NOT_NULL_TEST = {
    "str": [{ "key": 'not-null', "params": { "field": 'str', "value": null } }],
    "num": [{ "key": 'not-null', "params": { "field": 'num', "value": undefined } }],
    "arr": [{ "key": 'not-null', "params": { "field": 'arr', "value": null } }],
    "obj": [{ "key": 'not-null', "params": { "field": 'obj', "value": undefined } }]
}
export const NOT_EMPTY_TEST = {
    "str": [{ "key": 'not-empty', "params": { "field": 'str', "value": '' } }],
    "arr": [{ "key": 'not-empty', "params": { "field": 'arr', "value": [] } }],
    "obj": [{ "key": 'not-empty', "params": { "field": 'obj', "value": {} } }]
}
export const NOT_BLANK_TEST = {
    "str": [{ "key": 'not-blank', "params": { "field": 'str', "value": '' } }],
    "num": [{ "key": 'not-blank', "params": { "field": 'num', "value": null } }],
    "arr": [{ "key": 'not-blank', "params": { "field": 'arr', "value": [] } }],
    "obj": [{ "key": 'not-blank', "params": { "field": 'obj', "value": {} } }]
}

export const MIN_MAX_RANGE = {
    "min": [{ "key": 'min', "params": { "field": 'min', "min": 0, "value": -0.0000000001 } }],
    "max": [{ "key": 'max', "params": { "field": 'max', "max": 0, "value": 0.0000000001 } }],
    "greater": [{ "key": 'greater', "params": { "field": 'greater', "min": 0, "value": 0 } }],
    "less": [{ "key": 'less', "params": { "field": 'less', "max": 0, "value": 0 } }],
    "minmax": [{ "key": 'min', "params": { "field": 'minmax', "min": 0, "value": -1 } }],
}

export const MIN_MAX_OPTIONAL = {
    "min": [{ "key": 'min', "params": { "field": 'min', "min": 0, "value": null } }],
    "max": [{ "key": 'max', "params": { "field": 'max', "max": 0, "value": null } }],
    "greater": [{ "key": 'greater', "params": { "field": 'greater', "min": 0, "value": undefined } }],
    "less": [{ "key": 'less', "params": { "field": 'less', "max": 0, "value": undefined } }]
}

export const MIN_LENGTH_MAX_LENGTH_RANGE = {
    "minLength": [{ "key": 'min-length', "params": { "field": 'minLength', "min-length": 1, "value": "" } }],
    "maxLength": [{ "key": 'max-length', "params": { "field": 'maxLength', "max-length": 5, "value": "123456" } }],
    "both": [{ "key": 'min-length', "params": { "field": 'both', "min-length": 1, "value": "" } }]
}

export const MIN_LENGTH_MAX_LENGTH_OPTIONAL = {
    "minLength": [{ "key": 'min-length', "params": { "field": 'minLength', "min-length": 1, "value": null } }],
    "maxLength": [{ "key": 'max-length', "params": { "field": 'maxLength', "max-length": 5, "value": undefined } }]
}

export const REGEX_INVALID = {
    "regex": [{ "key": 'regex-donkey-or-monkey', "params": { "field": 'regex', "value": "doge", 'regex': "/(donkey|monkey)/" } }],
    "email": [{ "key": 'regex-email', "params": { "field": 'email', "value": "not-an-email", 'regex': EMAIL_REGEX.toString() } }]
}
export const REGEX_OPTIONAL = {
    "email": [{ "key": 'regex-email', "params": { "field": 'email', "value": undefined, 'regex': EMAIL_REGEX.toString() } }]
}

export const IN_VALUES_INVALID = {
    "str": [{ "key": 'in-values', "params": { "field": 'str', "value": "z", "allowed-values": InValuesValidation.STR_VALUES } }],
    "num": [{ "key": 'in-values', "params": { "field": 'num', "value": 99, "allowed-values": InValuesValidation.NUM_VALUES } }],
    "arr": [{ "key": 'in-values', "params": { "field": 'arr', "value": [], "allowed-values": InValuesValidation.ARR_VALUES } }],
    "obj": [{ "key": 'in-values', "params": { "field": 'obj', "value": {}, "allowed-values": InValuesValidation.OBJ_VALUES } }]
}

//Responses mock
export const RESPONSE_DEFAULT_CONFIGURATION_MIN_EN = {
    "rating": [
        "min-rating"
    ]
}
export const RESPONSE_DEFAULT_CONFIGURATION_MAX_ES = {
    "rating": [
        "El valor del campo 'rating' debe ser menor o igual de '10'."
    ]
}
export const RESPONSE_DEFAULT_CONFIGURATION_MAX_EN = {
    "rating": [
        "The value of the 'rating' field must be less or equal than '10'."
    ]
}
export const RESPONSE_CUSTOM_CONFIGURATION_MAX_ES = {
    "rating": [
        "El valor máximo para el campo 'rating' es '10'."
    ]
}
export const RESPONSE_CUSTOM_CONFIGURATION_MIN_AST = {
    "rating": [
        "¡Yes fatu! ¡En Asturies la valoración mínima ye como poco '0', a ver si te enteres soplagaitas!"
    ]
}