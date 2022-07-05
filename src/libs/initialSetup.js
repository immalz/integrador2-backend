import Role from "../models/Role";


export const createRoles = async() => {

    try {
        const count = await Role.estimatedDocumentCount()

        if (count > 0) return;

        const values = await Promise.all([
            new Role({ nombre: 'administrador' }).save(),
            new Role({ nombre: 'operador' }).save(),
        ])

        console.log(values);
    } catch (error) {
        console.log(error);
    }
}