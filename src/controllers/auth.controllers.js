import Usuario from "../models/Usuario";
import Historial from "../models/Historial"
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import config from '../config';

// Usuario

export const signUp = async(req, res) => {
    const { nombre, correo, contraseña, responsable, roles } = req.body;
    const newUsuario = new Usuario({
        nombre,
        correo,
        contraseña: await Usuario.encryptPassword(contraseña)
    })

    if (roles) {
        const foundRoles = await Role.find({ nombre: { $in: roles } });
        newUsuario.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({ nombre: "administrador" });
        newUsuario.roles = [role._id];
    }

    const newActividad = new Historial({
        titulo: 'Usuarios',
        descripcion: 'Se ha creado un nuevo Usuario',
        responsable
    })

    const savedUser = await newUsuario.save();
    if(savedUser) {
        const savedHistory = await newActividad.save();
    }
    

    console.log(savedUser);

    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400 // 24 horas
    });
    res.status(200).json({ token });

}

export const signIn = async(req, res) => {
    const userFound = await (await Usuario.findOne({ correo: req.body.correo }))

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    const matchPassword = await Usuario.comparePassword(req.body.contraseña, userFound.contraseña);

    if (!matchPassword) return res.status(401).json({ token: null, message: 'Contraseña invalida' })

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })

    res.json({ token, userFound });
}
