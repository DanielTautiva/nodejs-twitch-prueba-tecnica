import { Router, Response } from 'express';
import { SocketController } from '../controller/SocketController';

const router = Router();


router.get('/get-users-details', SocketController.getDetailUSer);

router.get('/get-users', SocketController.getUsers);

router.get('/mensajes', SocketController.sendGeneral);

router.get('/mensajes/:id', SocketController.sendPrivate);

export default router;