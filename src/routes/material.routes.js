import { Router } from "express";
const router = Router();

import * as materialCtrl from "../controllers/material.controller";

router.post('/', materialCtrl.crearMaterial);

router.get('/', materialCtrl.obtenerMateriales);

router.get('/:_id', materialCtrl.obtenerMaterial);

router.put('/:_id', materialCtrl.actualizarMaterial);

router.post('/:_id', materialCtrl.eliminarMaterial);



export default router;