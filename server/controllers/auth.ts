import {Request, Response} from "express";

export const login = (req: Request, res: Response) => {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
}

export const register = (req: Request, res: Response) => {
    res.status(200).json({
        register: true
    })
}
