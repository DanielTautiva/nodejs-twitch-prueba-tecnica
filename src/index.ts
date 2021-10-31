import "reflect-metadata";

// Config
import * as express from "express";
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as http  from "http";

// Routes
import routes from "./routes";

// Database
import { connect } from './mongo/mongodb';
import { createConnection, getRepository } from 'typeorm';

// Auth
import * as passport from 'passport'
import passportMiddleware  from './middlewares/passport-jwt';

// Sockets
import SocketIo from "./socket/socket";
import config from "./config/config";


// Connect DB 
createConnection().then(async () => {

    const server =  SocketIo.instance;

    // Config
    server.app.use(cors({ origin: true, credentials: true  }) );
    server.app.use(helmet());
    server.app.use(express.json());

    // Auth
    server.app.use(passport.initialize());
    server.app.use(passport.session());

    // Middleware
    passport.use(passportMiddleware);
    
    // Routes
    server.app.use('/', routes);

    // Mongo DB
    connect();

    // Start
    server.start( () => {
        console.log(`Servidor corriendo en el puerto ${ config.port }`);
    });

}).catch(error => console.log(error));