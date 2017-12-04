import { ServerRequestValidation } from './validation.model';
import { Validate, Valid } from "../../src/index";
import { Application } from 'express';

export class FakeController {
    @Validate()
    public postStuff( @Valid() stuff: ServerRequestValidation): ServerRequestValidation {
        return stuff;
    }
    public static register(app: Application) {
        const controller = new FakeController();
        const postHandler = (req, res, next) => {
            res.status(200).json(controller.postStuff(ServerRequestValidation.fromJson(req.body)));
        };

        app.post('/custom-configuration', postHandler);
        app.post('/default-configuration', postHandler);
    }
}