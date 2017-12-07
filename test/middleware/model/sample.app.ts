import * as bodyParser from "body-parser";
import * as debug from "debug";
import * as express from "express";
import * as http from "http";
import * as path from "path";
import { SampleController } from "./sample.controller";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }
    private configure(): void {
        this.app.set("port", process.env.PORT || 8080);
    }
    private middleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));
    }

    private routes(): void {
        SampleController.register(this.app);
    }
}

export const APP = new App().app;
