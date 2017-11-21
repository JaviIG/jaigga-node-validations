"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_error_1 = require("./validation/validation-error");
const MessagesSpanish = require("./messages/messages.es.json");
const MessagesEnglish = require("./messages/messages.en.json");
require("reflect-metadata");
const defaultMessages = {
    "es": MessagesSpanish,
    "en": MessagesEnglish
};
function validationErrorHandle(defaultLanguage = "en", userMessages) {
    return (err, req, res, next) => {
        if (err instanceof validation_error_1.ValidationError) {
            const validationError = err;
            const messages = userMessages || defaultMessages;
            const language = req.acceptsLanguages(Object.keys(messages));
            const error = createErrorObject(validationError, messages, language);
            res.status(400).send(error);
        }
    };
}
exports.validationErrorHandle = validationErrorHandle;
function createErrorObject(error, messages, language) {
    const response = {};
    for (let key in Object.keys(error.validation)) {
        const property = error.validation[key];
        response[key] = [];
        property.forEach((err) => {
            const message = messages[err.key];
            response[key].push(format(message, err.params));
        });
    }
    return response;
}
function format(string, params) {
    params.forEach((element, index) => {
        string = string.replace(new RegExp(`{${index}}`, 'g'), element);
    });
    return string;
}
var attribute_validations_1 = require("./attribute-validations");
exports.required = attribute_validations_1.required;
exports.min = attribute_validations_1.min;
exports.max = attribute_validations_1.max;
exports.minLength = attribute_validations_1.minLength;
exports.maxLength = attribute_validations_1.maxLength;
