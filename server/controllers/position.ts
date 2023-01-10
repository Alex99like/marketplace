import {Request, Response} from "express";
import Position from "../models/Position.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getByCategoryId = async (req: Request, res: Response) => {
    try {
        const user = req.user as { id: string, email: string }
        const positions = await Position.find({
            category: req.params.categoryId,
            user: user.id
        })
        res.status(200).json(positions)
    } catch (e) {
        errorHandler(res, e as Error)
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const user = req.user as { id: string, email: string }
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: user.id
        }).save()

        res.status(201).json(position)
    } catch (e) {
        errorHandler(res, e as Error)
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        await Position.remove({ _id: req.params.id })
        res.status(200).json({
            message: 'Позиция была удалена'
        })
    } catch (e) {
        errorHandler(res, e as Error)
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const position = await Position.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(position)
    } catch (e) {
        errorHandler(res, e as Error)
    }
}