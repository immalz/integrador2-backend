import { Schema, model } from "mongoose";

const HistorialSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
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

HistorialSchema.plugin(require('mongoose-autopopulate'));

export default model('Historial', HistorialSchema);