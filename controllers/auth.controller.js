import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
    const { contraseña, nombre, apellidos, correo } = req.body;
    console.log(contraseña, nombre, apellidos, correo);
    try {
        let user = await User.findOne({ correo });
        if (user) throw { code: 11000 };

        user = new User({ contraseña, nombre, apellidos, correo });
        await user.save();

        // Generar el token JWT
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user._id, res);

        return res.status(201).json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        // Alternativa por defecto mongoose
        if (error.code === 11000) {
            return res.status(400).json({ error: "Ya existe este usuario f" });
        }
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        let user = await User.findOne({ correo });
        if (!user)
            return res.status(403).json({ error: "No existe este usuario" });

        const respuestaPassword = await user.comparePassword(contraseña);
        if (!respuestaPassword)
            return res.status(403).json({ error: "Contraseña incorrecta" });

        // Generar el token JWT
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);

        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};


export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid);
        console.log("refreshToken" + req.uid);
        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de server" });
    }
};

export const infoUser = async (req, res) => {
    try {

        const user = await User.findById(req.uid).lean();
        console.log(user);
        return res.json({ correo: user.correo, nombre: user.nombre, apellidos: user.apellidos });
    } catch (error) {
        return res.status(500).json({ error: "error de server" });
    }
};

export const logout = (req, res) => {
    console.log("entre");
    try {
        res.clearCookie("refreshToken");
        res.json({ ok: "Todo bien" });
        console.log("Sesion cerrada");
    } catch (error) {
        return res.status(500).json({ error: "error de server" });
    }
};
