import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    contraseña: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("contraseña")) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        user.contraseña = await bcryptjs.hash(user.contraseña, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Falló el hash de contraseña");
    }
});

userSchema.methods.comparePassword = async function (canditatePassword) {
    return await bcryptjs.compare(canditatePassword, this.contraseña);
};

export const User = mongoose.model("User", userSchema);
