import { Router } from "express";
import { getAll, crete } from '../controllers/order.js'

export const router = Router()

router.get('/', getAll)
router.post('/', crete)