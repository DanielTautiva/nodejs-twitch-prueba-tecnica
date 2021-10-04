import {Router} from 'express';
import { ApiController } from '../controller/ApiController';

//
const router = Router();

/////////////////////////////////// TWITCH ///////////////////////////////////

router.get('/get-games-top', ApiController.getGamesTop);


/////////////////////////////////// NODE ///////////////////////////////////

// Get all
router.get('/games', [], ApiController.gelAll);
// Get one
router.get('/game/:id', [], ApiController.getById);
// Create
router.post('/create', [], ApiController.create);
// Update
router.patch('/update/:id', [], ApiController.update);
// Delete
router.delete('/delete/:id', [], ApiController.delete);


export default router;