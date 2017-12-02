# Jaigga Node Validations ![Travis build status](https://travis-ci.org/JaviIG/jaigga-node-validations.svg?branch=master)
A module to make that ugly model data validations easier. Inspired by javax.validation.

## Getting Started

This node module performs data validations by using decorators over class attributes. For using it you only have to install it and decorate that class attributes with the validations.

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
import { validationErrorHandler } from '../../src/index';
const app = express();
... //Make all your configurations here
app.use(validationErrorHandler());
```
Also, you can pass a custom configuration to the middleware:
//TO-DO

### Decorators configuration

Decorator | Configuration | Optional | Default | Description
--- | --- | ---
@notNull | msg-key | :white_check_mark: | 'not-empty' | A custom (or not) message key for use when formatting the error to the user
@notEmpty | msg-key | :white_check_mark: | 'not-empty' | A custom (or not) message key for use when formatting the error to the user
//TO-DO

## Running the tests

Once you have cloned the project, you just have to run

```
npm test
```

## Built With

* [Typescript](https://www.typescriptlang.org/) - The language used to built this module.
* [Deep equal](https://www.npmjs.com/package/deep-equal) - Compare JSON objects.
* [Reflect Metadata](https://www.npmjs.com/package/reflect-metadata) - Store validations in classes.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

As I have said before, this module is obviously inspired by the javax.validation API. My idea is to copy that easy validations which belong to the model, and add them the power of a language like javascript, where you can play a lot with with dynamic typing, functions, scopes...