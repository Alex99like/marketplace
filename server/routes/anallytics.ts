import { Router } from "express";
import { overview, analytics } from '../controllers/analytics.js'

export const router = Router()

router.get('/overview', overview)
router.get('/analytics', analytics)

router.get
