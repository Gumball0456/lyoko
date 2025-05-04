import { stream } from "../controllers/video.controller.js";

export function videoRoute(app){
    app.get('/video/:id', (req,res) => stream(req,res));
}