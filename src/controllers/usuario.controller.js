import Usuario from "../models/Usuario";
import Historial from "../models/Historial"
import Role from "../models/Role";

export const obtenerUsuarios = async(req, res) => {
    const Usuarios = await Usuario.find();
    res.status(200).json(Usuarios);
}

export const obtenerUsuario = async(req, res) => {

    const { _id } = req.params
    console.log(_id);

    const usuario = await Usuario.findById(_id);
    

    res.status(200).json(usuario);
}

export const actualizarUsuario = async(req, res) => {
    const {
        nombre,
        correo,
        roles,
        responsable
    } = req.body;

    const myquery = { _id: req.params._id };

    const foundRoles = await Role.find({ nombre: { $in: roles } });
    const newrol = foundRoles.map(role => role._id)

    const UsuarioActualizado = await Usuario.updateOne(myquery, {
        nombre,
        correo,
        'roles': newrol
    }, {
        new: true
    })
    
    const newActividad = new Historial({
        titulo: 'Usuarios',
        descripcion: 'Se ha actualizo el usuario: ' + nombre,
        responsable
    })

    if (UsuarioActualizado) {
        const savedHistory = await newActividad.save();
    }

    res.status(200).json({ message: UsuarioActualizado })
}

export const eliminarUsuario = async(req, res) => {

    const { _id } = req.params;
    const { responsable } = req.body;

    const UsuarioEliminado = await Usuario.findByIdAndDelete(_id);

    const newActividad = new Historial({
        titulo: 'Usuarios',
        descripcion: 'Se ha eliminado el usuariode ID: ' + _id,
        responsable
    })

    if (UsuarioEliminado) {
        const savedHistory = await newActividad.save();
    }

    res.status(200).json({ message: 'Usuario Eliminado' });
}