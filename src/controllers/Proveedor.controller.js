import Proveedor from "../models/Proveedor";
import Historial from "../models/Historial"

export const crearProveedor = async(req, res) => {

    const { 
        razon_social,
        correo,
        ruc,
        celular,
        encargado,
        responsable
    } = req.body;

    const newActividad = new Historial({
        titulo: 'Proveedor',
        descripcion: 'Se ha registrado el proveedor: ' + razon_social,
        responsable
    })

    const nuevoProveedor = new Proveedor({
        razon_social,
        correo,
        ruc,
        celular,
        encargado 
    });

    const proveedorGuardado = await nuevoProveedor.save();

    if (proveedorGuardado) {
        const savedHistory = await newActividad.save();
    }

    res.status(201).json({ proveedorGuardado });
}


export const obtenerProveedores = async(req, res) => {
    const profesores = await Proveedor.find();
    res.status(200).json(profesores);
}

export const obtenerProveedor = async(req, res) => {
    const { _id } = req.params
    const proveedor = await Proveedor.findById(_id);

    res.status(200).json(proveedor);
}

export const actualizarProveedor = async(req, res) => {
    const {
        razon_social,
        correo,
        ruc,
        celular,
        encargado,
        responsable
    } = req.body;

    const myquery = { _id: req.params._id };

    const newActividad = new Historial({
        titulo: 'Proveedor',
        descripcion: 'Se ha actualizado el proveedor: ' + razon_social,
        responsable
    })

    const updateProveedor = await Proveedor.updateOne(myquery, {
        nombre,
        correo,
        ruc,
        razon_social,
        celular,
        encargado
    }, {
        new: true
    })

    if (updateProveedor) {
        const savedHistory = await newActividad.save();
    }
    

    res.status(200).json({ message: 'Datos del Proveedor Actualizados!' })
}

export const eliminarProveedor = async(req, res) => {

    const { _id } = req.params;

    const {
        responsable
    } = req.body;

    const proveedorEliminado = await Proveedor.findByIdAndDelete(_id);

    const newActividad = new Historial({
        titulo: 'Proveedor',
        descripcion: 'Se ha eliminado un proveedor de ID: ' +  _id,
        responsable
    })
    
    if (proveedorEliminado) {
        const savedHistory = await newActividad.save();
    }

    res.status(200).json({ message: 'Datos del Proveedor Eliminados!' });
}