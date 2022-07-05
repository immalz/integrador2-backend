import { Router } from "express";
const router = Router();

// fotografias
import path from 'path';
import multer from 'multer';
import { v4 as uuid } from 'uuid';

import * as authCtrl from '../controllers/auth.controllers'
import { verifySignup } from '../middlewares'


// multer 
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    dest: path.join(__dirname, '../../uploads'),
    limit: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp|jfif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Tipo de archivo no soportado")
    }
}).single('foto');



router.post('/signup', [
    verifySignup.checkDuplicatedUsernameOrEmail,
    verifySignup.checkRolesExisted
], authCtrl.signUp);

router.post('/signin', authCtrl.signIn);

export default router;