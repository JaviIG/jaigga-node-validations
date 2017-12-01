# Jaigga Node Validations

A module to make that ugly model data validations easier. Inspired by javax.validation.

## Getting Started

This node module performs data validations by using decorators over class attributes. For using it you only have to install it and decorate that class attributes with the validations.

### Prerequisites

What things you need to install the software and how to install them

```
npm install --save jaigga-node-validations
```

### Installing

You just need to execute this command inside your project folder.

```
npm install --save jaigga-node-validations
```

After installing, you just have to add the provided middleware after all of your routes. The provided middleware is just a custom error handler, which will translate and format the error messages to the user request preferences.

## Usage


### Configuration

Both the decorators and the middleware have lots of properties you can use to customize how they behave.

#### Decorators configuration

Decorator | Configuration | Optional | Default | Description
--- | --- | ---
@notNull | msg-key | :white_check_mark: | 'not-empty' | A custom (or not) message key for use when formatting the error to the user
@notEmpty | msg-key | :white_check_mark: | 'not-empty' | A custom (or not) message key for use when formatting the error to the user


#### Middleware configuration

Test | Purpose 
--- | --- 

## Running the tests

Once you have cloned the project, you just have to run

```
npm test
```

### Break down into end to end tests

The tests are divided into two files, one for the decorators, and another one for the NodeJS middleware:

#### Decorators
This tests ensure the correct working of all the decorators in the module:
Test | Purpose 
--- | --- 

#### Middleware
Middleware tests ensure the correct working of the middleware layer in the module:
Test | Purpose 
--- | --- 


## Built With

* [Typescript](https://www.typescriptlang.org/) - The language used to built this module
* [Deep equal](https://www.npmjs.com/package/deep-equal) - Compare JSON objects

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

As I have said before, this module is clearly inspired by the javax.validation API. I have tried to improve it with the power of Typescript, making it more dynamic and fitting in more situations. Also, I'm totally open for any suggestions of improving it.