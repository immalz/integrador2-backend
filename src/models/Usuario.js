import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        unique: true,
        required: true,
    },
    contraseña: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId,
        autopopulate: true
    }]
}, {
    timestamps: true,
    versionKey: false
});

UsuarioSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

UsuarioSchema.statics.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

UsuarioSchema.plugin(require('mongoose-autopopulate'));

export default model('Usuario', UsuarioSchema);