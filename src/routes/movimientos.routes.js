import { Router } from "express";
const router = Router();

import * as movimientoCtrl from "../controllers/EntradaSalida.controller";

router.post('/', movimientoCtrl.crearMovimiento);

router.get('/', movimientoCtrl.obtenerMovimientos);

router.get('/:_id', movimientoCtrl.obtenerMovimiento);

router.put('/:_id', movimientoCtrl.actualizarMovimiento);

router.post('/:_id', movimientoCtrl.eliminarMovimiento);



export default router;