import { Router } from 'express';
import { logout, refreshSession, signIn, signUp } from '../controllers/auth.js';
import { celebrate } from 'celebrate';
import { signInSchema, signUpSchema } from '../validation/auth.js';

const router = Router();

router.post('/sign-up', celebrate(signUpSchema), signUp);
router.post('/sign-in', celebrate(signInSchema), signIn);
router.post('/logout', logout);
router.post('/refresh', refreshSession);

export default router;
