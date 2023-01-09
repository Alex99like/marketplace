import { Router } from "express";
import { create, remove, update, getByCategoryId } from '../controllers/position.js'

export const router = Router()

router.get('/:categoryId', getByCategoryId)
router.post('/', create)
router.patch('/:id', update)
router.delete('/:id', remove)