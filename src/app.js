import "@babel/polyfill";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import pkg from '../package.json';
import { createRoles } from './libs/initialSetup'

import authRoutes from './routes/auth.routes';
import usuarioRoutes from './routes/usuario.routes';
import proveedorRoutes from './routes/proveedor.routes';
import historialRoutes from './routes/historial.routes';
import materialRoutes from './routes/material.routes';
import movimientoRoutes from './routes/movimientos.routes';

const app = express();
createRoles();

app.set('pkg', pkg);

//cambiar la configuracion cors para produccion
app.use(cors());

app.use('/uploads', express.static(path.resolve('uploads')));

app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        author: app.get('pkg').author,
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
        scripts: app.get('pkg').scripts
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/proveedor', proveedorRoutes);
app.use('/api/material', materialRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/movimiento', movimientoRoutes);

export default app;