import { Schema, model } from "mongoose";

const MaterialSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    fecha_ingreso: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    cantidad: {
        type: String,
        required: true
    },
    proveedor: [{
        ref: "Proveedor",
        type: Schema.Types.ObjectId,
        autopopulate: true
    }]
}, {
    timestamps: true,
    versionKey: false
});

MaterialSchema.plugin(require('mongoose-autopopulate'));

export default model('Material', MaterialSchema);