import { FakeController } from './fake-controller';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as debug from 'debug';
import { validationErrorHandler } from '../../src/index';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }
    private configure(): void {
        this.app.set('port', process.env.PORT || 8080);
    }
    private middleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    }

    private routes(): void {
        FakeController.register(this.app);
    }
}

export default new App().app;
