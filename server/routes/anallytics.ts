import { Router } from "express";
import { overview, analytics } from '../controllers/analytics.js'
// @ts-ignore
import passport from "passport";

export const router = Router()

router.get('/overview', passport.authenticate('jwt', { session: false }), overview)
router.get('/analytics', passport.authenticate('jwt', { session: false }), analytics)

