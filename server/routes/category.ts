import { Router } from "express";
import { getAll, create, getById, remove, update } from '../controllers/category.js'

export const router = Router()

router.get('/', getAll)
router.get('/:id', getById)
router.delete('/:id', remove)
router.post('/', create)
router.patch('/:id', update)
