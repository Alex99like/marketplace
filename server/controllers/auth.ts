// @ts-ignore
import jwt from 'jsonwebtoken'

import { Request, Response } from "express";
import * as bcrypt from 'bcrypt'
import User from '../models/User.js'
import {jwtKey} from "../config/keys.js";
import {errorHandler} from "../utils/errorHandler.js";

export const login = async (req: Request, res: Response) => {
    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
        const passwordResult = await bcrypt.compare(req.body.password, candidate.password)
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, jwtKey, { expiresIn: '24h' })

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'Пароль не верный. Попробуй еще раз'
            })
        }
    } else {
        res.status(404).json({
            message: 'Пользователь с таким email не найден'
        })
    }
}

export const register = async (req: Request, res: Response) => {

    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
        res.status(409).json({
            message: 'Такой Email уже занят попробуйте другой'
        })
    } else {
        const salt = await bcrypt.genSalt(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch(e) {
            errorHandler(res, e as Error)
        }
    }
}
