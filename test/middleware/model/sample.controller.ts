import { Application } from "express";
import { Valid, Validate } from "../../../src/index";
import { SampleModel } from "./Sample.model";

export class SampleController {
    public static register(app: Application) {
        const controller = new SampleController();
        const postHandler = (req, res, next) => {
            res.status(200).json(controller.postStuff(SampleModel.fromJson(req.body)));
        };

        app.post("/custom-configuration", postHandler);
        app.post("/default-configuration", postHandler);
    }

    @Validate()
    public postStuff( @Valid() stuff: SampleModel): SampleModel {
        return stuff;
    }
}
