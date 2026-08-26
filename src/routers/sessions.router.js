import {Router} from 'express';
import {login, logout, register} from '../controllers/session.controller.js'
import { validateBody } from '../middlewares/validate.meddleware.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/logout', logout);

export default router;
