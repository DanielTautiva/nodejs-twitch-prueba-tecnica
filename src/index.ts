import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";

import * as cors from 'cors';
import * as helmet from 'helmet';
import * as http  from "http";

import routes from "./routes";
//
import { connect } from './mongodb/mongodb';

const PORT = process.env.PORT || 3000;

//
createConnection().then(async () => {

    // create express app
    const app = express();
    //
    app.use(cors({ origin: true, credentials: true  }) );
    //
    app.use(helmet());
    //
    app.use(express.json());
    //
    app.use('/', routes);

    // http Server
    const httpServer = http.createServer(app);

    // mongo DB
    connect();

    // io sockets
    // let io = require("socket.io")(httpServer, {
    //     cors: {
    //         origin: true,
    //         credentials: true
    //     },            
    // });

    // // class socket
    // let socket = new SocketIo(io);

    // start express server
    httpServer.listen(PORT, () => {
        console.log('Server running port: '+PORT); 
    });

  
}).catch(error => console.log(error));

