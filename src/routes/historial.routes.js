import { Router } from "express";
const router = Router();

import * as historialCtrl from "../controllers/historial.controller";



router.get('/', historialCtrl.obtenerHistorial);

router.delete('/:_id', historialCtrl.eliminarHistorial);



export default router;