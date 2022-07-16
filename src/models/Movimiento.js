import { Schema, model } from "mongoose";

const MovimientoSchema = new Schema({
    material: [{
        ref: "Material",
        type: Schema.Types.ObjectId,
        autopopulate: true
    }],
    tipo: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    responsable: [{
        ref: "Usuario",
        type: Schema.Types.ObjectId,
        autopopulate: true
    }]
}, {
    timestamps: true,
    versionKey: false
});

MovimientoSchema.plugin(require('mongoose-autopopulate'));

export default model('Movimiento', MovimientoSchema);