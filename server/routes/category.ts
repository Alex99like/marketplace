import { Router } from "express";
import { getAll, create, getById, remove, update } from '../controllers/category.js'
// @ts-ignore
import passport from 'passport'
import upload from '../middleware/upload.js'
export const router = Router()

router.get('/', passport.authenticate('jwt', { session: false }), getAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), getById)
router.delete('/:id', passport.authenticate('jwt', { session: false }), remove)
router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), update)
