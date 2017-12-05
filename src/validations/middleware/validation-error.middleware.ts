import { messages as messagesEn } from "./../../messages/messages.en";
import { messages as messagesEs } from "./../../messages/messages.es";
import { ISingleValidationError } from "./../single-validation-error";
import { ValidationError } from "./../validation-error";

const defaultMessages = {
    es: messagesEs,
    en: messagesEn,
};

export function validationErrorHandler(defaultLanguage: string = "en", userMessages?: any) {
    return (err, req, res, next) => {
        if (err instanceof ValidationError) {
            const validationError = err as ValidationError;
            const messages = userMessages || defaultMessages;
            const language = req.acceptsLanguages(Object.keys(messages)) || defaultLanguage;
            const errors = createErrorObject(validationError.errors, messages, language);
            res.status(400).send(errors);
        }
    };
}

function createErrorObject(errors: any, messages: any, language: string) {
    const response = {};
    for (const property in errors) {
        if (errors.hasOwnProperty(property)) {
            const propertyErrors: ISingleValidationError[] = errors[property];
            response[property] = propertyErrors.map((err) => format(err, messages, language));
        }
    }
    return response;
}

function format(error: ISingleValidationError, messages: any, language: string) {
    let errorString = messages[language][error.key] || error.key;
    for (const property in error.params) {
        if (error.params.hasOwnProperty(property)) {
            errorString = errorString.split(`{${property}}`).join(error.params[property]);
        }
    }
    return errorString;
}
