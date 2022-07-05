import { ROLES } from '../models/Role'
import Usuario from '../models/Usuario'

export const checkDuplicatedUsernameOrEmail = async(req, res, next) => {
    try {
        const alumno = await Usuario.findOne({ nombre: req.body.nombre })
        if (alumno) return res.status(400).json({ message: 'El usuario ya existe' });

        const correo = await Usuario.findOne({ correo: req.body.correo })
        if (correo) return res.status(400).json({ message: 'El correo ya existe' });

        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `El rol ${req.body.roles[i]} no existe`,
                });
            }
        }
    }
    next();
};
