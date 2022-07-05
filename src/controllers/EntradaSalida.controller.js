import Movimiento from "../models/Movimiento";
import Historial from "../models/Historial"

export const crearMovimiento = async(req, res) => {

    const { 
        material,
        tipo,
        cantidad,
        responsable
    } = req.body;

    const newActividad = new Historial({
        titulo: 'Ingreso y Salida',
        descripcion: 'Se ha registrado correctamente',
        responsable
    })

    const nuevoMaterial = new Movimiento({
        material,
        tipo,
        cantidad,
        responsable
    });

    const proveedorGuardado = await nuevoMaterial.save();

    if (proveedorGuardado) {
        const savedHistory = await newActividad.save();
    }

    res.status(201).json({ proveedorGuardado });
}


export const obtenerMovimientos = async(req, res) => {
    const profesores = await Movimiento.find();
    res.status(200).json(profesores);
}

export const obtenerMovimiento = async(req, res) => {
    const { _id } = req.params
    const proveedor = await Movimiento.findById(_id);

    res.status(200).json(proveedor);
}

export const actualizarMovimiento = async(req, res) => {
    const {
        material,
        tipo,
        cantidad,
        responsable
    } = req.body;

    const myquery = { _id: req.params._id };

    const newActividad = new Historial({
        titulo: 'Movimiento',
        descripcion: 'Se ha actualizado el material: ' + nombre,
        responsable
    })

    const updateMaterial = await Movimiento.updateOne(myquery, {
        material,
        tipo,
        cantidad,
        responsable
    }, {
        new: true
    })

    if (updateMaterial) {
        const savedHistory = await newActividad.save();
    }
    

    res.status(200).json({ message: 'Datos del Movimiento Actualizados!' })
}

export const eliminarMovimiento = async(req, res) => {

    const { _id } = req.params;

    const {
        responsable
    } = req.body;

    const movimientoEliminado = await Movimiento.findByIdAndDelete(_id);

    const newActividad = new Historial({
        titulo: 'Movimiento',
        descripcion: 'Se ha eliminado un material de ID: ' +  _id,
        responsable
    })
    
    if (movimientoEliminado) {
        const savedHistory = await newActividad.save();
    }

    res.status(200).json({ message: 'Datos del Movimiento Eliminados!' });
}