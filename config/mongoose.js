import { db_connetion_string } from "./env/development.js";
import mongoose from "mongoose";

// register the models
import '../app/models/video.model.js'


export default () => {
    const db = mongoose.connect(db_connetion_string)
    return db
}