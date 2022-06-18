import { Router } from "express";
import { redirectLink } from "../controllers/redirect.controller.js";
const router = Router();

router.get("/", redirectLink);

export default router;