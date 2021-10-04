import {Router} from 'express';
import auth from './auth';
import api from './api';

const routes = Router();
//
routes.use('/public', auth);
//
routes.use('/api', [], api);

export default routes;