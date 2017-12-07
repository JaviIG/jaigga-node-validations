import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as mocha from "mocha";
import { validationErrorHandler } from "../../src/index";
import { MIDDLEWARE_RESPONSE_ERROR } from "./middleware.mock";
import { APP } from "./model/sample.app";
import { SampleModel } from "./model/sample.model";

describe("Middleware error handler", () => {
    chai.use(chaiHttp);
    const expect = chai.expect;
    const server = APP.listen(8080);
    describe("Default configuration entity validation", () => {
        const configurationEndpoint = "/default-configuration";
        APP.use(configurationEndpoint, validationErrorHandler());
        it("Should send a 200 response with the entity if it is valid", (done) => {
            const validEntity = new SampleModel(5);
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
            const invalidEntity = new SampleModel(15);
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
            const invalidEntity = new SampleModel(-5);
            chai.request(server)
                .post(configurationEndpoint)
                .send(invalidEntity)
                .catch((err) => {
                    expect(err.response.body).to.deep.equal(MIDDLEWARE_RESPONSE_ERROR.DEFAULT.MIN_EN);
                    done();
                });
        });
        it("Error response should return the message in the default language if a non-accepted language is requested", (done) => {
            const invalidEntity = new SampleModel(15);
            chai.request(server)
                .post(configurationEndpoint)
                .set("accept-language", "ch")
                .send(invalidEntity)
                .catch((err) => {
                    expect(err.response.body).to.deep.equal(MIDDLEWARE_RESPONSE_ERROR.DEFAULT.MAX_EN);
                    done();
                });
        });
        it("Error response should return the message in the requested language (if our server accepts it)", (done) => {
            const invalidEntity = new SampleModel(15);
            chai.request(server)
                .post(configurationEndpoint)
                .set("accept-language", "es")
                .send(invalidEntity)
                .catch((err) => {
                    expect(err.response.body).to.deep.equal(MIDDLEWARE_RESPONSE_ERROR.DEFAULT.MAX_ES);
                    done();
                });
        });
    });
    describe("Custom configuration entity validation", () => {
        const configurationEndpoint = "/custom-configuration";
        const defaultLanguage = "es";
        const customConfiguration = {
            ast: {
                "max": "¿Estamos tontos o que?, a ver si nos enteramos que el valor máximo pa '{field}' ye '{max}'",
                "min-rating": "¡Yes fatu! ¡En Asturies la valoración mínima ye como poco '{min}', a ver si te enteres soplagaitas!",
            },
            es: {
                "max": "El valor máximo para el campo '{field}' es '{max}'.",
                "min-rating": "La valoración máxima debe ser '{min}'.",
            },
        };
        APP.use(configurationEndpoint, validationErrorHandler(defaultLanguage, customConfiguration));
        it("Should send a 200 response with the entity if it is valid.", (done) => {
            const validEntity = new SampleModel(5);
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
            const invalidEntity = new SampleModel(-5);
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
            const invalidEntity = new SampleModel(15);
            chai.request(server)
                .post(configurationEndpoint)
                .send(invalidEntity)
                .catch((err) => {
                    expect(err.response.body).to.deep.equal(MIDDLEWARE_RESPONSE_ERROR.CUSTOM.MAX_ES);
                    done();
                });
        });
        it("Should send messages in the requested language.", (done) => {
            const invalidEntity = new SampleModel(-5);
            chai.request(server)
                .post(configurationEndpoint)
                .set("accept-language", "ast")
                .send(invalidEntity)
                .catch((err) => {
                    expect(err.response.body).to.deep.equal(MIDDLEWARE_RESPONSE_ERROR.CUSTOM.MIN_AST);
                    done();
                });
        });
    });
    after(() => server.close());
});
