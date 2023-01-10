import { Router } from "express";
import { create, remove, update, getByCategoryId } from '../controllers/position.js'
// @ts-ignore
import passport from "passport";

export const router = Router()

router.get('/:categoryId', passport.authenticate('jwt', { session: false }), getByCategoryId)
router.post('/', passport.authenticate('jwt', { session: false }), create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), update)
router.delete('/:id', passport.authenticate('jwt', { session: false }), remove)