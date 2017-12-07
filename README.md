# Jaigga Node Validations ![Travis build status](https://travis-ci.org/JaviIG/jaigga-node-validations.svg?branch=master)
A module to make that ugly model data validations easier. Inspired by javax.validation.

## Why?
Because i was bored after several weeks of no programming because of my master's degree documentation subjects. Also I saw how Typescript/Javascript decorators worked and I instantly fell in love.

## Getting Started

This node module performs data validations by using decorators over class attributes. For using it you only have to install it and decorate that class attributes with the validations.

###Requirements
At the moment this module is only working with **Typescript** NodeJS projects. In the future I'll try to make it compatible with vanilla js projects.

### Installing

You just need to execute this command inside your project folder and voilá! you have installed it successfully.

```
npm install --save jaigga-node-validations
```

After installing, you just have to add the provided middleware after all of your routes. The provided middleware is just a custom error handler, which will translate and format the error messages to the user request preferences. I will explain this in the configuration section.

## Configuration

Both the decorators and the middleware have lots of properties you can use to customize how they behave.

### Middleware configuration
First of all you will need to configure the middleware. For doing this, simply add after all of your routes the provided error handler.
```
import { validationErrorHandler } from 'jaigga-node-validations';
const app = express();
... //Make all your middleware and routes configuration here
app.use(validationErrorHandler());
```
Also, you can pass a custom configuration to the middleware:
```
app.use(validationErrorHandler(defaultLanguage, myCustomMessages)
```
This parameters are:

 - **defaultLanguage**: The default language when the user has not requested one, or has requested a non available one.
 - **myCustomMessages**: A JSON object with the languages and the messages for them:
```
"es": {
	"min": "El valor mínimo para {field} es {min}."
	"rating: "La valoración debe estar entre 0 y 10"
}
"en: {
	"min": "The minimum value for {field} is {min}."
	"rating: "The rating value must be between 0 and 10."
}
```

### Validator configuration
When you want your object to be valid you have to annotate the method with @Validate() annotation, and the model parameter with @Valid() annotation.

```
class MyController {
	@Validate()
	public doSomething(@Valid()myModel: MyModel) {
		storeInDB(myModel);
	}
}
```
In this example, before the doSomething method is executed, it will validate the entity. If it's not valid it will throw an exception, captured by the middleware you just registered.

### Decorators configuration

Each decorator has its own options. Because of some of the configurations are optional, I decided to make them an interface for each validation. It's all documented inside the code so you can easily use them while programming. 
The usage is really easy:
```
class MyModel {
	@Min({"min": 0})
	@Max({"max": 5})
	public myProperty:number;
	...
}
```
Some configuration options allow functions instead of an static value. Passing a function instead of a value like a number, allows us to perform a dynamic validation, not just simple checks. This functions will follow this signature
```
(instance) => number
```
The instance is the current object, so you can access its own methods and attributes.
So, imagine that you have a form model with two inputs, birth year and graduation year. You want to check that the graduation year is bigger than birth year. With this decorators you can now simply do this:
```
class YearsForm {
    @Min({"min": 1900})
    public birthYear:number;
    @Min({"min": (instance) => instance.birthYear})
    public graduationYear:number;
}
```
And congratulations! You have successfully checked in one line that the graduation year is bigger than the birth year.

#### @NotNull
Checks that the attribute is not null or undefined.

 - **Valid**:  "a", {}, [], 0
 - **Invalid**: null, undefined

Configuration | Required | Default | Description
--- | --- | --- | ---
msg-key | :x: | 'not-null' | A custom (or not) message key for use when formatting the error to the user

#### @NotEmpty
Checks that the attribute is not empty.

 - **Valid**:  null, undefined, "a", 1, {"x": ""}, [undefined]
 - **Invalid**: "", {}, []

Configuration | Required | Default | Description
--- | --- | --- | ---
msg-key | :x: | 'not-empty' | A custom (or not) message key for use when formatting the error to the user

#### @NotBlank
Checks that the attribute is not empty, undefined or null.

 - **Valid**:  "a", 1, {"x": null}, [undefined]
 - **Invalid**: "", {}, [], undefined, null

Configuration | Required | Default | Description
--- | --- | --- | ---
msg-key | :x: | 'not-blank' | A custom (or not) message key for use when formatting the error to the user

#### @Min
Checks that the attribute is bigger or equal than the **min** parameter.

Configuration | Required | Default | Description
--- | --- | --- | ---
msg-key | :x: | 'min' | A custom (or not) message key for use when formatting the error to the user
optional |:x: | false | If true the validation will only execute if the value is not null or undefined.
min | :white_check_mark: | | The minimum allowed value for the property


#### @Greater
Checks that the attribute is bigger than the **min** parameter.

Configuration | Required | Default | Description
--- | --- | --- | ---
msg-key | :x: | 'greater' | A custom (or not) message key for use when formatting the error to the user
optional |:x: | false | If true the validation will only execute if the value is not null or undefined.
min | :white_check_mark: | | The minimum allowed value for the property

#### @Max
Checks that the attribute is smaller or equal than the max parameter.

Configuration | Required | Default | Description
--- | --- | --- | ---
msg-key | :x: | 'max' | A custom (or not) message key for use when formatting the error to the user
optional |:x: | false | If true the validation will only execute if the value is not null or undefined.
max | :white_check_mark: | | The maximum allowed value for the property

#### @Less
Checks that the attribute is smaller than the max parameter.

Configuration | Required | Default | Description
--- | --- | --- | ---
msg-key | :x: | 'less' | A custom (or not) message key for use when formatting the error to the user
optional |:x: | false | If true the validation will only execute if the value is not null or undefined.
max | :white_check_mark: | | The maximum allowed value for the property

#### @InRange
Checks that the attribute value is between the min and max parameters.

Configuration | Required | Default | Description
--- | --- | --- | ---
msg-key | :x: | 'in-range' | A custom (or not) message key for use when formatting the error to the user
optional |:x: | false | If true the validation will only execute if the value is not null or undefined.
min | :white_check_mark: | | The minimum allowed value for the property
max | :white_check_mark: | | The maximum allowed value for the property

#### @MinLength
Checks that the attribute is smaller than the min parameter.

Configuration | Required | Default | Description
--- | --- | --- | ---
msg-key | :x: | 'min-length' | A custom (or not) message key for use when formatting the error to the user
optional |:x: | false | If true the validation will only execute if the value is not null or undefined.
min | :white_check_mark: | | The minimum allowed value for the property string value
trim | :x: | false | If true, the string value will be trimmed (trimming a string removes the leading and trailing white space and line terminator characters from a string) before checking its length.

#### @MaxLength
Checks that the string length is less or equal than the max parameter.

Configuration | Required | Default | Description
--- | --- | --- | ---
msg-key | :x: | 'max-range' | A custom (or not) message key for use when formatting the error to the user
optional |:x: | false | If true the validation will only execute if the value is not null or undefined.
max | :white_check_mark: | | The maximum allowed length for the property string value
trim | :x: | false | If true, the string value will be trimmed (trimming a string removes the leading and trailing white space and line terminator characters from a string) before checking its length.

#### @InLengthRange
Checks that the length of the string value is between the range of the min and max parameters.

Configuration | Required | Default | Description
--- | --- | --- | ---
msg-key | :x: | 'in-length-range' | A custom (or not) message key for use when formatting the error to the user
optional |:x: | false | If true the validation will only execute if the value is not null or undefined.
min | :white_check_mark: | | The minimum allowed length for the property string value
max | :white_check_mark: | | The maximum allowed length for the property string value
trim | :x: | false | If true, the string value will be trimmed (trimming a string removes the leading and trailing white space and line terminator characters from a string) before checking its length.

#### @InValues
Checks that the value of the object is one of the allowed values.

Configuration | Required | Default | Description
--- | --- | --- | ---
msg-key | :x: | 'in-values' | A custom (or not) message key for use when formatting the error to the user.
allowedValues | :white_check_mark: | | The array of allowed values of the object

#### @MatchesRegex
Checks that the string matches the regex provided.

Configuration | Required | Default | Description
--- | --- | --- | ---
msg-key | :x: | 'regex' | A custom (or not) message key for use when formatting the error to the user
optional |:x: | false | If true the validation will only execute if the value is not null or undefined.
regex | :white_check_mark: | | The regular expression to test the string with

#### @Email
Checks that the string is a valid e-mail address. It's a shortcut for @Regex decorator.

Configuration | Required | Default | Description
--- | --- | --- | ---
msg-key | :x: | 'regex-email' | A custom (or not) message key for use when formatting the error to the user
optional |:x: | false | If true the validation will only execute if the value is not null or undefined.

## Running the tests

Once you have cloned the project, you just have to run

```
npm test
```

## Built With

* [Typescript](https://www.typescriptlang.org/) - The language used to built this module.
* [Deep equal](https://www.npmjs.com/package/deep-equal) - Compare JSON objects.
* [Reflect Metadata](https://www.npmjs.com/package/reflect-metadata) - Store validations in classes.

## TO-DO
I'm planning to keep this module updated and keep adding new features. Right now this is my route and status:

Feature | Status | Description
--- | --- | ---
Improve testing | Done | Refactor current tests and add some more to ensure the module works perfectly fine.
Async validations | Planned | Allow asynchronous validations for querying a DB, calling a REST, or make heavy calculations for example.
Conditional validations | Planned | Only validate a property if some condition is met.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

As I have said before, this module is obviously inspired by the javax.validation API. My idea is to copy that easy validations which belong to the model, and add them the power of a language like Typescript/Javascript, where you can play a lot with with dynamic typing, functions, scopes...