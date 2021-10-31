import SocketIo, { userController } from '../socket/socket';
import * as http from 'http';
import * as express from 'express';
import { Socket } from 'socket.io';
import { Request, Response } from 'express';

export class SocketController {

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    public static sendPrivate(req: Request, res: Response){

        try{

            const { cuerpo, de } = req.body;
            const id = req.params.id;
    
            const server = SocketIo.instance;
 
            server.io.in( id ).emit( 'mensaje-privado', { cuerpo, de } );
            
            return res.json({
                ok: true,
                cuerpo,
                de,
                id
            });

        } catch (error) {
            return res.status(400).json({
                message: ( error?.errors?.length ? error?.errors[0]?.message : null) || error?.message
            });
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    public static sendGeneral(req: Request, res: Response){

        try{

            const { cuerpo, de } = req.body;
            const id = req.params.id;
    
            const server = SocketIo.instance;
            server.io.emit( 'mensaje-nuevo', { cuerpo, de } );
            
            return res.json({
                ok: true,
                cuerpo,
                de,
                id
            });

        } catch (error) {
            return res.status(400).json({
                message: ( error?.errors?.length ? error?.errors[0]?.message : null) || error?.message
            });
        }
    }


        /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    public static getUsers = async (req: Request, res: Response) => {
        try{
            
            const server = SocketIo.instance;

            server.io.allSockets().then((clientes)=>{
                res.json({
                    ok:true,
                    clientes: Array.from(clientes)
                });
            }).catch((err)=>{
                res.json({
                    ok:false,
                    err
                })
            });
        } catch (error) {
            return res.status(400).json({
                message: ( error?.errors?.length ? error?.errors[0]?.message : null) || error?.message
            });
        }
    }

    public static getDetailUSer = async (req: Request, res: Response) => {

        res.json({
            ok: true,
            clientes: userController.getLista()
        })
    }
}