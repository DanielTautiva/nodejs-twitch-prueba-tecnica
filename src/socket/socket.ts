
import { Server, Socket } from 'socket.io';

export default class SocketIo {

    public constructor(io) {
        io.on('connection',(cliente)=>{

            console.log('Cliente conectado');
            
            // Cliente desconectado
            this.desconectar(cliente);

            // Mensajes
            this.messange(cliente, io);

        });
    }

    desconectar(cliente: Socket){
        cliente.on('disconnect',()=>{
            console.log('Cliente desconectado');
        });
    }

    messange(cliente: Socket, io: Server){
        cliente.on('message', (payload: {by: string, body: string}) => {
            console.log(payload);
            io.emit('message-new', payload);
        });
    }

}