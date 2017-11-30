import { ServerRequestValidation } from './util/validation.model';
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from './util/fake-server'
import { validationErrorHandler } from '../src/index';
import { RESPONSE_DEFAULT_CONFIGURATION_MIN_EN, RESPONSE_DEFAULT_CONFIGURATION_MAX_ES, RESPONSE_DEFAULT_CONFIGURATION_MAX_EN, RESPONSE_CUSTOM_CONFIGURATION_MIN_AST, RESPONSE_CUSTOM_CONFIGURATION_MAX_ES } from './util/responses.mock';

describe("Validation error handler", () => {
    chai.use(chaiHttp);
    const expect = chai.expect;
    const server = app.listen(8080);
    describe("Default configuration entity validation", () => {
        const configurationEndpoint = '/default-configuration';
        app.use(configurationEndpoint, validationErrorHandler());
        it("Should send a 200 response with the entity if it is valid", (done) => {
            const validEntity = new ServerRequestValidation(5);
            chai.request(server)
                .post(configurationEndpoint)
                .send(validEntity)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res).to.be.json;
                    done();
                });
        });
        it("Should send a 400 response with the error data if its not valid", (done) => {
            const invalidEntity = new ServerRequestValidation(15);
            chai.request(server)
                .post(configurationEndpoint)
                .send(invalidEntity)
                .catch((err) => {
                    expect(err.response.status).to.equal(400);
                    expect(err.response).to.be.json;
                    done();
                });
        });
        it("Error response should return the message key if there is no message", (done) => {
            const invalidEntity = new ServerRequestValidation(-5);
            chai.request(server)
                .post(configurationEndpoint)
                .send(invalidEntity)
                .catch((err) => {
                    expect(err.response.body).to.deep.equal(RESPONSE_DEFAULT_CONFIGURATION_MIN_EN);
                    done();
                });
        });
        it("Error response should return the message in the default language if a non-accepted language is requested", (done) => {
            const invalidEntity = new ServerRequestValidation(15);
            chai.request(server)
                .post(configurationEndpoint)
                .set('accept-language', 'ch')
                .send(invalidEntity)
                .catch((err) => {
                    expect(err.response.body).to.deep.equal(RESPONSE_DEFAULT_CONFIGURATION_MAX_EN);
                    done();
                });
        });
        it("Error response should return the message in the requested language (if our server accepts it)", (done) => {
            const invalidEntity = new ServerRequestValidation(15);
            chai.request(server)
                .post(configurationEndpoint)
                .set('accept-language', 'es')
                .send(invalidEntity)
                .catch((err) => {
                    expect(err.response.body).to.deep.equal(RESPONSE_DEFAULT_CONFIGURATION_MAX_ES);
                    done();
                });
        });
    })
    describe("Custom configuration entity validation", () => {
        const configurationEndpoint = '/custom-configuration';
        const defaultLanguage = "es";
        const customConfiguration = {
            "es": {
                "max": "El valor máximo para el campo '{field}' es '{max}'.",
                "min-rating": "La valoración máxima debe ser '{min}'."
            }, "ast": {
                "max": "¿Estamos tontos o que?, a ver si nos enteramos que el valor máximo pa '{field}' ye '{max}'",
                "min-rating": "¡Yes fatu! ¡En Asturies la valoración mínima ye como poco '{min}', a ver si te enteres soplagaitas!"
            }
        };
        app.use(configurationEndpoint, validationErrorHandler("es", customConfiguration));
        it("Should send a 200 response with the entity if it is valid.", (done) => {
            const validEntity = new ServerRequestValidation(5);;
            chai.request(server)
                .post(configurationEndpoint)
                .send(validEntity)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res).to.be.json;
                    done();
                });
        });
        it("Should send a 400 response with the error data if its not valid", (done) => {
            const invalidEntity = new ServerRequestValidation(-5);
            chai.request(server)
                .post(configurationEndpoint)
                .send(invalidEntity)
                .catch((err) => {
                    expect(err.response.status).to.equal(400);
                    expect(err.response).to.be.json;
                    done();
                });
        });
        it("Should send messages in the default language when no one is specified in the request.", (done) => {
            const invalidEntity = new ServerRequestValidation(15);
            chai.request(server)
                .post(configurationEndpoint)
                .send(invalidEntity)
                .catch((err) => {
                    expect(err.response.body).to.deep.equal(RESPONSE_CUSTOM_CONFIGURATION_MAX_ES);
                    done();
                });
        });
        it("Should send messages in the requested language.", (done) => {
            const invalidEntity = new ServerRequestValidation(-5);
            chai.request(server)
                .post(configurationEndpoint)
                .set('accept-language', 'ast')
                .send(invalidEntity)
                .catch((err) => {
                    expect(err.response.body).to.deep.equal(RESPONSE_CUSTOM_CONFIGURATION_MIN_AST);
                    done();
                });
        });
    })
    after(() => server.close());
});