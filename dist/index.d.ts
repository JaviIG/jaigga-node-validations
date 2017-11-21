import "reflect-metadata";
export declare function validationErrorHandle(defaultLanguage?: string, userMessages?: any): (err: any, req: any, res: any, next: any) => void;
export { required, min, max, minLength, maxLength } from './attribute-validations';
