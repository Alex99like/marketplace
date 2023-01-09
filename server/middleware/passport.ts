import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { model } from 'mongoose'
import { PassportStatic } from 'passport'

const User = model('users')
import {jwtKey} from "../config/keys.js";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtKey
}

export default (passport: PassportStatic) => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {

                const user = await User.findById(payload.userId).select('email id')

                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )
}
