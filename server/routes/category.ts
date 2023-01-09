import { Router } from "express";
import { getAll, create, getById, remove, update } from '../controllers/category.js'
// @ts-ignore
import passport from 'passport'

export const router = Router()

router.get('/', passport.authenticate('jwt', { session: false }), getAll)
router.get('/:id', getById)
router.delete('/:id', remove)
router.post('/', create)
router.patch('/:id', update)
