import { Router } from "express";
import { getAll, crete } from '../controllers/order.js'
// @ts-ignore
import passport from "passport";

export const router = Router()

router.get('/',  passport.authenticate('jwt', { session: false }), getAll)
router.post('/',  passport.authenticate('jwt', { session: false }), crete)