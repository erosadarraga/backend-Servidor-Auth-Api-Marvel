import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireToken = async (req, res, next) => {
    try {
        let token = await req.headers?.authorization;

        if (!token) throw new Error("No Bearer");

        if (token) {
            token = await token.toString()
            token = await token.split(" ")[1];
            console.log(token);
        }

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();
    } catch (error) {
        console.log(error.message);
        return res
            .status(401)
            .send({ error: tokenVerificationErrors[error.message] });
    }
};
