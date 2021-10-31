
import { Server, Socket } from 'socket.io';
import { UserController } from '../controller/UserController';
import { User } from '../models/User';
import * as express from 'express';
import * as http from 'http';
import config from '../config/config';


export const userController = new UserController();
export default class SocketIo {

    private static _intance: SocketIo;

    public app: express.Application;
    public port: number;

    public io: Server;
    private httpServer: http.Server; 

    public constructor() {

        // Create app
        this.app = express();
        
        // HttpServer
        this.httpServer = http.createServer(this.app);

        // Sockets
        this.io = require("socket.io")(this.httpServer, {
            cors: {
                origin: true,
                credentials: true
            },            
        });

        this.io.on('connection',(cliente)=>{

            // Conectar cliente
            this.conectarCliente( cliente, this.io);

            // Configurar usuario
            this.configurarUsuario( cliente, this.io);

            // Mensajes
            this.messange(cliente, this.io);

            // Cliente desconectado
            this.desconectar(cliente, this.io);

            //
            this.obtenerUsuarios(cliente, this.io);
        });
    }

    public static get instance() {
        return this._intance || ( this._intance = new this() );
    }

    conectarCliente = ( cliente: Socket, io: Server ) => {
        const usuario = new User(cliente.id);
        userController.agregar( usuario );
    }

    configurarUsuario(cliente: Socket, io: Server){
        cliente.on('configurar-usuario', (  payload: { nombre: string }, callback: Function  ) => {

            userController.actualizarNombre( cliente.id, payload.nombre );
            io.emit('usuarios-activos', userController.getLista());

            callback({
                ok: true,
                mensaje: `Usuario ${ payload.nombre }, configurado`
            });
        });
    }

    desconectar(cliente: Socket, io: Server){
        cliente.on('disconnect',()=>{
            console.log('Cliente desconectado');
            userController.borrarUsuario( cliente.id );
            io.emit('usuarios-activos', userController.getLista());
        });
    }

    messange(cliente: Socket, io: Server){
        cliente.on('mensaje', (payload: {by: string, body: string}) => {
            console.log(payload);
            io.emit('mensaje-nuevo', payload);
        });
    }

    obtenerUsuarios(cliente: Socket, io: Server){
        cliente.on('obtener-usuarios', (payload: {by: string, body: string}) => {
            io.to(cliente.id).emit('usuarios-activos', userController.getLista());
        });
    }

    // Start
    start( callback: Function ) {
        this.httpServer.listen(config.port, callback);
    }

}