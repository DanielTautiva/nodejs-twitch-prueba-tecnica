import {Request, Response} from "express";
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from "../config/config";
import { validate } from "class-validator";
import { email } from "../config/mailer";
export class AuthController {


    public static signUp = async (req: Request, res: Response) => {   

        const { username, password } = req.body

        if (!username || !password) {
            res.sendStatus(400).json({message: "Please. Send your email and password"});
        }
    
        let user = await getRepository(User).findOne({ username: username});
        if (user) {
            return res.status(400).json({message: "The User already Exists"});
        }

        user = new User();

        try {
            
            // attributes
            user.username = username;
            user.password = password;
            user.id_rol = config.rols.client;
    
            // hash password
            user.hash();
            
            const newUser = getRepository(User);
            await newUser.save(user);
            
            // token
            const auth = new AuthController();

            res.send({
                message:'Create successful',
                token: auth.createToken(user, config.jwtSecret),
                refresh_token: auth.createToken(user, config.jwtSecretRefresh)
            })

        } catch (error) {
            return res.status(400).json({
                 message: ( error?.errors?.length ? error?.errors[0]?.message : null) || error?.message
            });
        }
    }


    public static signIn = async (req: Request, res: Response)  => {   

        const { username, password } = req.body

        if (!username|| !password) {
             res.sendStatus(400).json({message: "Please. Send your email and password"});  
        }
        
        const user = await getRepository(User).findOne({ username: username });

        if (!user) {   
            return res.status(400).json({message: "The User does not Exists"});
        }
        

        try{
     
            const isMatch = await user.compare(password);

            if (isMatch) {

                const auth = new AuthController();

                let jsonSend = { 
                    token: auth.createToken(user, config.jwtSecret),
                    refresh_token: auth.createToken(user, config.jwtSecretRefresh)
                }

                user.refresh_token = jsonSend.refresh_token;

                const userRepository = await getRepository(User);

                await userRepository.save(user);

                return res.status(400).json(jsonSend);
            }
        
            return res.status(400).json({
                message: "The email or password are incorrect"
            });

        } catch (error) {
            return res.status(400).json({
                message: ( error?.errors?.length ? error?.errors[0]?.message : null) || error?.message
            });
        }
    }


    public static refreshToken = async (req: Request, res: Response) => {

        const refresh_token = req.headers.refresh as string;

        if(!refresh_token){
            res.status(400).json({
                message: 'Somenthing goes wrong!'
            });
        }

        const userRepositiry = getRepository(User);
        let user: User;

        try {

            const verifyResult = jwt.verify(refresh_token, config.jwtSecretRefresh);

            const { id } = verifyResult as User;

            user = await userRepositiry.findOneOrFail({ where: { id }});

            let auth = new AuthController();

            res.send({
                message:'Successful',
                token: auth.createToken(user, config.jwtSecretRefresh)
            })

        } catch (error) {
            return res.status(400).json({
                message: ( error?.errors?.length ? error?.errors[0]?.message : null) || error?.message
            });
        }
    }


    public static forgotPassword = async (req: Request, res: Response) => {

        const { username } = req.body;

        if (!username) {
            res.sendStatus(400).json({message: "Please. Send your email"});
        }
    
        let user = await getRepository(User).findOne({ username: username } );

        if (!user) {
            return res.status(400).json({message: "The User not Exists"});
        }

        const userRepository = getRepository(User);
        
        try {

            let auth = new AuthController();
            const token = auth.createToken(user, config.jwtSecretReset, '10m');

            user.reset_token = token;
            await userRepository.save(user); 
            
            // SEND MAIL
            email.send({
                template: 'forgot-password',
                message: {
                  from: '"Forgot password" <tautivadaniel17@gmail.com>', // sender address
                  to: user.username, 
                },
                locals: {
                   resetUrl: config.redirect + '/resetpass/' + token,
                   username: user.username
                },
            }).then(() => {
                res.send({
                    message: 'Email has been send!'
                });
            });

        } catch (error) {
            return res.status(400).json({
                message: ( error?.errors?.length ? error?.errors[0]?.message : null) || error?.message
            });
        }
    }


    public static changePassword = async (req: Request, res: Response) => {

        const { password } = req.body;
        const reset_token  = req.headers.reset as string;

        if (!password) {
            res.sendStatus(400).json({message: "Please. Send your new password"});
        }

        const userRepository = getRepository(User);
        let user:User;

        try {

            const verifyResult = jwt.verify(reset_token, config.jwtSecretReset);

            user = await userRepository.findOne({where: {reset_token}});

            user.password = password;

            const validationOps = { validationError: { target: false, value: false } };

            let errors = await validate(user, validationOps);
            
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            user.hash();

            await userRepository.save(user);

            res.send({
                message:'Change Successful'   
            })

        } catch (error) {
            return res.status(400).json({
                message: ( error?.errors?.length ? error?.errors[0]?.message : null) || error?.message
            });
        }
    }

    private createToken(user: User, jwtSecret: string, expireIn:any = 84400) {
        return jwt.sign({ id: user.id, email: user.username }, jwtSecret, {
          expiresIn: expireIn
        });
    }
}