import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const ProveedorSchema = new Schema({
    
    razon_social: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        unique: true,
        required: true,
    },
    ruc: {
        type: String,
        required: true
    },
    celular: {
        type: Number,
        required: true
    },
    encargado: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});



ProveedorSchema.plugin(require('mongoose-autopopulate'));

export default model('Proveedor', ProveedorSchema);