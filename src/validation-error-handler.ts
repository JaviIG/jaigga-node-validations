import { ValidationError } from "./util/validation-error";
import { SingleValidationError } from "./util/single-validation-error";

const defaultMessages = {
    "es": require('./messages/messages.es.json'),
    "en": require('./messages/messages.en.json')
}

export function validationErrorHandler(defaultLanguage: string = "en", userMessages?: any) {
    return (err, req, res, next) => {
        if (err instanceof ValidationError) {
            const validationError = <ValidationError>err;
            const messages = userMessages || defaultMessages;
            const language = req.acceptsLanguages(Object.keys(messages)) || defaultLanguage;
            const errors = createErrorObject(validationError.errors, messages, language);
            res.status(400).send(errors);
        }
    }
}

function createErrorObject(errors: any, messages: any, language: string) {
    const response = {};
    for (let property in errors) {
        const propertyErrors: SingleValidationError[] = errors[property];
        response[property] = propertyErrors.map((err) => format(err, messages, language));
    }
    return response;
}

function format(error: SingleValidationError, messages: any, language: string) {
    let string = messages[language][error.key] || error.key;
    for (let property in error.params) {
        string = string.split(`{${property}}`).join(error.params[property]);
    }
    return string;
}