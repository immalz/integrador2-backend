import { Router } from "express";
const router = Router();

import * as proveedorCtrl from "../controllers/Proveedor.controller";

router.post('/', proveedorCtrl.crearProveedor);

router.get('/', proveedorCtrl.obtenerProveedores);

router.get('/:_id', proveedorCtrl.obtenerProveedor);

router.put('/:_id', proveedorCtrl.actualizarProveedor);

router.post('/:_id', proveedorCtrl.eliminarProveedor);

export default router;