import { ServerRequestValidation } from './util/validation.model';
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from './util/fake-server'
import { validationErrorHandler } from '../src/index';
import { RESPONSE_DEFAULT_CONFIGURATION_MIN_EN, RESPONSE_DEFAULT_CONFIGURATION_MAX_ES, RESPONSE_DEFAULT_CONFIGURATION_MAX_EN } from './util/responses.mock';

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
                "min": "El valor mínimo para el campo {fieldname} is {min}",
                "min-rating": "La valoración mínima debe ser un {min}"
            }, "en": {
                "min": "The minimum allowed value for field {fieldname} is {min}",
                "min-rating": "Minimum allowed rating is {min}"
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
    })
    after(() => server.close());
});