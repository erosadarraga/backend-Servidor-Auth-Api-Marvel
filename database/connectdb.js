import mongoose from "mongoose";
import { URI_MONGO } from "../config.js";

try {
    console.log(URI_MONGO);
    await mongoose.connect(process.env.URI_MONGO);
    console.log("Connect DB ok 👋");
} catch (error) {
    console.log("Error de conexión a mongodb:" + error);
}
