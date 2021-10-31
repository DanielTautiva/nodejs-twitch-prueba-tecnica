import {Router} from 'express';
import auth from './auth';
import api from './api';
import socket from './socket';

import * as passport from 'passport';

const routes = Router();
//
routes.use('/public', auth);
//
routes.use('/api', passport.authenticate('jwt', { session: false }), api);
//
routes.use('/socket', socket);

export default routes;