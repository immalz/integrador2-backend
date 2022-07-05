import Noticia from '../models/Material';
import path from 'path';
import fs from 'fs-extra';

export const obtenerNoticias = async(req, res) => {

    const noticias = await Noticia.find();

    res.status(200).json(noticias);
}

export const crearNoticia = async(req, res) => {

    const { titulo, descripcion, enlaces } = req.body;


    const nuevaNoticia = new Noticia({
        titulo,
        descripcion,
        enlaces,
        foto: req.file.path
    });

    const noticiaGuardada = await nuevaNoticia.save();

    res.status(201).json({ noticiaGuardada });
}


export const eliminarNoticia = async(req, res) => {

    const { _id } = req.params;

    const noticia = await Noticia.findByIdAndDelete(_id);

    if (noticia) {
        await fs.unlink(path.resolve(noticia.foto));
    }

    res.status(204).json({ message: 'Noticia Eliminada' });
}