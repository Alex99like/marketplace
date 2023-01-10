import {Request, Response} from "express";
import {errorHandler} from "../utils/errorHandler.js";
import Category from "../models/Category.js";
import Position from "../models/Position.js";

export const getAll = async (req: Request, res: Response) => {
    try {
        const user = req.user as { id: string, email: string }
        const categories = await Category.find({user: user.id})
        res.status(200).json(categories)
    } catch (e) {
        errorHandler(res, e as Error)
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e as Error)
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        await Category.remove({_id: req.params.id})
        await Position.remove({category: req.params.id})
        res.status(200).json({
            message: 'Категория удалена.'
        })
    } catch (e) {
        errorHandler(res, e as Error)
    }
}

export const create = async (req: Request, res: Response) => {
    const user = req.user as { id: string, email: string }

    const category = new Category({
        name: req.body.name,
        user: user.id,
        imageSrc: req.file ? req.file.path : '',
    })

    try {
        await category.save()
        res.status(201).json(category)
    } catch (e) {
        errorHandler(res, e as Error)
    }
}

export const update = async (req: Request, res: Response) => {
    const updated: { name: string, imageSrc?: string } = {
        name: req.body.name
    }

    if (req.file) {
        updated.imageSrc = req.file.path
    }

    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e as Error)
    }
}