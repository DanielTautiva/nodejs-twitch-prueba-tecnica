import {Request, Response} from "express";
import config from "../config/config";
// Twitch
import TwitchApi from "node-twitch";
import { TwitchApiConfig } from "node-twitch/dist/types/options";
// Request
import * as https from 'https';
// TypeOrm
import {getRepository} from "typeorm";
import { validate } from "class-validator";


import { mongo } from "mongoose";

export class ApiController {

    
    /**
     * 
     * @param req 
     * @param res 
     */    
    public static local (req: Request, res: Response) { 
        
        const { username, password } = req.body
        
        res.send({
            message:'successful',
            user: username
        })

    }

    /**
     * 
     * @param req 
     * @param res 
     */
    // public static getCredentials = async(req: Request, response: Response) => {

        //     const options = {
        //         host: 'api.twitch.tv',
        //         path: '/helix/users',
        //         port: 443,
        //         method: 'GET',
        //         headers: {
        //             'Client-ID': '5ifqdodgc62lwu3kru0ylwpy4g66vg',
        //             'Authorization': 'Bearer ' + '2b2hudo7stgld47ivz0vi9sl4ie3ae',
        //         }
        //     };

        //     try {
                
        //         const request = https.request(options, (res) => {

        //             if (res.statusCode !== 200) {
        //               console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
        //               res.resume();
        //               return;
        //             }
                
        //             let data = '';
                
        //             res.on('data', (chunk) => {
        //               data += chunk;
        //             });
                
        //             res.on('close', () => {
        //               console.log('Updated data');
        //               console.log(JSON.parse(data));
        //             });
        //         });

        //     } catch (error) {
        //         return response.status(400).json({
        //             message: ( error?.errors?.length ? error?.errors[0]?.message : null) || error?.message
        //         });

        //     } 

    // }

    /**
     * 
     * @param req 
     * @param res 
     */
    // public static getGamesTop = async(req: Request, res: Response) => {

    //     const options: TwitchApiConfig = {
    //         client_id: config.CLIENT_ID,
    //         client_secret: config.CLIENT_SECRET
    //     }

    //     const twitch = new TwitchApi(options); 

    //     try {
            
    //         const getTopGames = await twitch.getTopGames();

    //         //
    //         for (const item of getTopGames.data) {

    //             const _id  = item.id;
    //             const name = item.name;
    //             const url = item.box_art_url;

    //             ///////////////////////  MONGO ///////////////////////
    //             const mongoOne = await GamesMongo.findById({_id: _id});

    //             if(mongoOne){

    //                 await GamesMongo.findByIdAndUpdate({_id: _id}, {
    //                     _id,
    //                     name, 
    //                     url
    //                 });

    //             }else{

    //                 const mongoSave = new GamesMongo({ _id, name, url });
    //                 await mongoSave.save();
    //             }

    //             /////////////////////// MYSQL ///////////////////////
    //             let mysqlSave:GameMysql;
    //             const mysqlRepository = getRepository(GameMysql);

    //             mysqlSave = await mysqlRepository.findOne({
    //                 where:
    //                 {name: name}
    //             });

    //             if(!mysqlSave){
    //                 mysqlSave = new GameMysql();
    //             }

    //             mysqlSave.id = item.id;
    //             mysqlSave.name = name;
    //             mysqlSave.url = url;

    //             await mysqlRepository.save(mysqlSave);

    //         };

    //         res.send(getTopGames);

    //     } catch (error) {
    //         return res.status(500).json({
    //             message: ( error?.errors?.length ? error?.errors[0]?.message : null) || error?.message,
    //             data: error
    //         });

    //     }   
    // }   

    /***
     * 
     */
    // public static gelAll = async(req: Request, res: Response) => {

    //     ///////////////////////  MONGO ///////////////////////
    //     const mongoAll = await GamesMongo.find();
   
    //     /////////////////////// MYSQL ///////////////////////
    //     const mysqlRepository = getRepository(GameMysql);
    //     const mysqlAll = await mysqlRepository.find();

    //     if((mongoAll.length && mysqlAll.length) > 0){
    //         res.send({
    //             'mongo': mongoAll,
    //             'mysql': mongoAll,
    //         })
    //     }

    //     res.status(400).json({message: 'Not result!'})
    // }

    /**
     * 
     * @param req 
     * @param res 
     */
    // public static getById = async(req: Request, res: Response) => {

    //     const { id }  = req.params;

    //     try {

    //         ///////////////////////  MONGO ///////////////////////

    //         const mongoOne = await GamesMongo.findById({_id: id});

    //         /////////////////////// MYSQL ///////////////////////

    //         const mysqlRepository = getRepository(GameMysql);
    

    //         const mysqlOne = await mysqlRepository.findOne({
    //             where:
    //             {id: id}
    //         });

    //         res.send({
    //             'mongo': mongoOne ?? "Not Results",
    //             'mysql': mysqlOne ?? "Not Results",
    //         })

    //     } catch (error) {
    //         return res.status(400).json({
    //             message: ( error?.errors?.length ? error?.errors[0]?.message : null) || error?.message
    //         });
    //     }

    // }


    /**
     * 
     * @param req 
     * @param res 
     */
    // public static create = async(req: Request, res: Response) => {

    //     const { _id, name, url } = req.body;

    //     try {
            
    //         ///////////////////////  MONGO ///////////////////////

    //         const mongoSave = new GamesMongo({  _id, name, url });
    //         await mongoSave.save();
 
    //         /////////////////////// MYSQL ///////////////////////

    //         const mysqlSave = new GameMysql();

    //         mysqlSave.id = _id;
    //         mysqlSave.name = name;
    //         mysqlSave.url = url;
        
    //         const errors = await validate(mysqlSave, {
    //             validationError:{target: false, value: false} 
    //         });


    //         if(errors.length > 0){
    //             res.status(400).json(errors)
    //         }

    //         const mysqlRepository = getRepository(GameMysql);
    //         await mysqlRepository.save(mysqlSave);

    //         res.send({
    //             message:'Create successful',
    //             mongo: mongoSave,
    //             mysql: mysqlSave,
    //         });

    //     } catch (error) {
    //         return res.status(400).json({
    //             message: ( error?.errors?.length ? error?.errors[0]?.message : null) || error?.message
    //         });
    //     }
    // }

    /**
     * 
     * @param req 
     * @param res 
     */
    // public static update = async(req: Request, res: Response) => {
        
    //     let mysqlSave:GameMysql;

    //     const _id = req.params.id;
    //     const { name, url } = req.body;

    //     try {

    //         ///////////////////////  MONGO ///////////////////////

    //         await GamesMongo.findByIdAndUpdate({_id: _id}, {
    //             _id,
    //             name, 
    //             url
    //         });
            
    //         /////////////////////// MYSQL ///////////////////////

    //         const mysqlRepository = getRepository(GameMysql);

    //         mysqlSave = await mysqlRepository.findOne({
    //             where:
    //             {id: _id}
    //         });

    //         mysqlSave.name = name ?? mysqlSave.name;
    //         mysqlSave.url = url ?? mysqlSave.url;

    //         const errors = await validate(mysqlSave, {
    //             validationError:{target: false, value: false} 
    //         });
    
    //         if(errors.length > 0){
    //             res.status(400).json(errors)
    //         }
    
    //         await mysqlRepository.save(mysqlSave);
                
    //         res.status(201).send({
    //             message:'Update successful'
    //         });

    //     } catch (error) {
    //         return res.status(400).json({
    //             message: ( error?.errors?.length ? error?.errors[0]?.message : null) || error?.message
    //         });
    //     } 
    // }
    

    /**
     * 
     * @param req 
     * @param res 
     */
    // public static delete = async(req: Request, res: Response) => {

        
    //     let mysqlDelete:GameMysql;
    //     const _id = req.params.id;

    //     try {

    //         ///////////////////////  MONGO ///////////////////////

    //         await GamesMongo.findByIdAndDelete({_id: _id});

    //         /////////////////////// MYSQL ///////////////////////

    //         const mysqlRepository = getRepository(GameMysql);

    //         mysqlDelete = await mysqlRepository.findOne({
    //             where:
    //             {id: _id}
    //         });

    //         await mysqlRepository.remove(mysqlDelete);

    //         res.status(201).send({
    //             message:'Delete successful'
    //         });

    //     } catch (error) {
    //         return res.status(400).json({
    //             message: ( error?.errors?.length ? error?.errors[0]?.message : null) || error?.message
    //         });
    //     }
    // }
}
