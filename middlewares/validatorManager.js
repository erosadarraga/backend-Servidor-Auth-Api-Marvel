import { validationResult, body, param } from "express-validator";


export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "salio algo mal en validation result" });
    }
    next();
};

export const paramLinkValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

export const bodyRegisterValidator = [
    body("correo", "Formato de correo incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("contraseña", "Mínimo 2 carácteres").trim().isLength({ min: 2 }
    ),
    body("nombre", "Mínimo 2 carácteres").trim().isLength({ min: 2 }),
    validationResultExpress,
];

export const bodyLoginValidator = [
    body("correo", "Formato de correo incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("contraseña", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    validationResultExpress,
];
