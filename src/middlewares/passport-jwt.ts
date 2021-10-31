import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

// models
import { User } from "../entity/User";
import { getRepository } from "typeorm";

// config
import config from "../config/config";
 
const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

export default new Strategy(opts, async (payload, done) => {

    try {

        const user = await getRepository(User).findOne({ where: {id: payload.id}});

        if (user) {
            return done(null, user);
        }

        return done(null, false);

    } catch (error) {

        return done(error);
    }
});