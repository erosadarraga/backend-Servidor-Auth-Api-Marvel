import { User } from "../models/User.js";


export const redirectLink = async (req, res) => {
    try {
        return res.redirect("api/v1/auth/login");
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor rederi" });
    }
};