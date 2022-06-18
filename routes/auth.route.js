import { Router } from "express";
import { body } from "express-validator";
import {
    infoUser,
    login,
    logout,
    register,
} from "../controllers/auth.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
    bodyLoginValidator,
    bodyRegisterValidator,
} from "../middlewares/validatorManager.js";

const router = Router();

router.post("/register", bodyRegisterValidator, register);
router.post("/login", bodyLoginValidator, login);
router.get("/protected", requireToken, infoUser);
router.get("/logout", logout);

export default router;
