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
            const language = getLanguage(req, defaultLanguage, messages);
            const errors = validationError.errors;
            createErrorMessages(errors, messages, language);
            res.status(400).send(errors);
        }
    };
}
function getLanguage(req: any, defaultLanguage: string, messages: any): string {
    const languagesAccepted = req.acceptsLanguages();
    const userAcceptsAllLanguages = languagesAccepted.length === 1 && languagesAccepted[0] === "*";
    if (languagesAccepted.length === 0 || userAcceptsAllLanguages) {
        return defaultLanguage;
    } else {
        return req.acceptsLanguages(Object.keys(messages)) || defaultLanguage;
    }
}
function createErrorMessages(errors: any, messages: any, language: string) {
    for (const property in errors) {
        if (errors.hasOwnProperty(property)) {
            const propertyErrors: ISingleValidationError[] = errors[property];
            propertyErrors.forEach((err) => err.description = format(err, messages, language));
        }
    }
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
