import { Router } from "express";
const router = Router();

import * as usuarioCtrl from "../controllers/usuario.controller";

router.get('/', usuarioCtrl.obtenerUsuarios);
router.get('/:_id', usuarioCtrl.obtenerUsuario);
router.put('/:_id', usuarioCtrl.actualizarUsuario);
router.delete('/:_id', usuarioCtrl.eliminarUsuario);

export default router;