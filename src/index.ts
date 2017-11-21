import { SingleValidationError } from './validation/single-validation-error';
import { ValidationError } from './validation/validation-error';
import * as MessagesSpanish from './messages/messages.es.json';
import * as MessagesEnglish from './messages/messages.en.json';
import "reflect-metadata";

const defaultMessages = {
    "es": MessagesSpanish,
    "en": MessagesEnglish
}

export function validationErrorHandle(defaultLanguage:string = "en", userMessages?:any) {
    return (err, req, res, next) => {
        if( err instanceof ValidationError) {
            const validationError = <ValidationError> err;
            const messages = userMessages || defaultMessages;
            const language = req.acceptsLanguages(Object.keys(messages));
            const error = createErrorObject(validationError, messages, language);
            res.status(400).send(error);
        }
    }
}

function createErrorObject(error:ValidationError, messages:any, language:string){
    const response = {};
    for(let key in Object.keys(error.validation)) {
        const property:SingleValidationError[] = <SingleValidationError[]> error.validation[key];
        
        response[key] = [];
        property.forEach((err) => {
            const message = messages[err.key]
            response[key].push(format(message, err.params))
        });
    }
    return response;
}

function format(string, params){
    params.forEach((element, index) => {
        string = string.replace(new RegExp(`{${index}}`, 'g'), element);
    });
    return string;
}

export {required, min, max, minLength, maxLength} from './attribute-validations';