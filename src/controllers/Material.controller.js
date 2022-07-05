import Material from "../models/Material";
import Historial from "../models/Historial"

export const crearMaterial = async(req, res) => {

    const { 
        nombre,
        fecha_ingreso,
        precio,
        cantidad,
        proveedor,
        responsable
    } = req.body;

    const newActividad = new Historial({
        titulo: 'Material',
        descripcion: 'Se ha registrado el material: ' + nombre,
        responsable
    })

    const nuevoMaterial = new Material({
        nombre,
        fecha_ingreso,
        precio,
        cantidad,
        proveedor,
    });

    const proveedorGuardado = await nuevoMaterial.save();

    if (proveedorGuardado) {
        const savedHistory = await newActividad.save();
    }

    res.status(201).json({ proveedorGuardado });
}


export const obtenerMateriales = async(req, res) => {
    const profesores = await Material.find();
    res.status(200).json(profesores);
}

export const obtenerMaterial = async(req, res) => {
    const { _id } = req.params
    const proveedor = await Material.findById(_id);

    res.status(200).json(proveedor);
}

export const actualizarMaterial = async(req, res) => {
    const {
        nombre,
        fecha_ingreso,
        precio,
        cantidad,
        proveedor,
    } = req.body;

    const myquery = { _id: req.params._id };

    const newActividad = new Historial({
        titulo: 'Material',
        descripcion: 'Se ha actualizado el material: ' + nombre,
        responsable
    })

    const updateMaterial = await Material.updateOne(myquery, {
        nombre,
        fecha_ingreso,
        precio,
        cantidad,
        proveedor,
    }, {
        new: true
    })

    if (updateMaterial) {
        const savedHistory = await newActividad.save();
    }
    

    res.status(200).json({ message: 'Datos del Material Actualizados!' })
}

export const eliminarMaterial = async(req, res) => {

    const { _id } = req.params;

    const {
        responsable
    } = req.body;

    const proveedorEliminado = await Material.findByIdAndDelete(_id);

    const newActividad = new Historial({
        titulo: 'Material',
        descripcion: 'Se ha eliminado un material de ID: ' +  _id,
        responsable
    })
    
    if (proveedorEliminado) {
        const savedHistory = await newActividad.save();
    }

    res.status(200).json({ message: 'Datos del Material Eliminados!' });
}