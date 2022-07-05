import { Schema, model } from "mongoose";

export const ROLES = ['administrador', 'operador']

const roleSchema = new Schema({
    nombre: String,
}, {
    versionKey: false
})

export default model('Role', roleSchema)