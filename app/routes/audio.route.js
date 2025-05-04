import { stream } from "../controllers/audio.controller.js";

export function audioRoute(app){
    app.get('/audio/:id', (req,res) => stream(req,res));
}