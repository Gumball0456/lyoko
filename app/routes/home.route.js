import { render } from "../controllers/home.controller.js";

export function homeRoute (app){
    app.get('/', (req,res) => {
        render(req,res)
    });
}