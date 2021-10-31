import {Router} from 'express';
import { AuthController } from '../controller/AuthController';

//
const router = Router();



router.post('/signup', AuthController.signUp);

router.post('/signin', AuthController.signIn);

router.post('/refresh-token', AuthController.refreshToken);

router.post('/forgot-password', AuthController.forgotPassword);

router.post('/change-password', AuthController.changePassword);

export default router;