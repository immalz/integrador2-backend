import Historial from '../models/Historial';
import path from 'path';
import fs from 'fs-extra';


export const obtenerHistorial = async(req, res) => {

    const historial = await Historial.find();
    
    res.status(200).json(historial);
}


export const eliminarHistorial = async(req, res) => {

    const { _id } = req.params;

    const historial = await Historial.findByIdAndDelete(_id);

    res.status(204).json({ message: 'Historial Eliminado' });
}