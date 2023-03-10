// @ts-ignore
import express from 'express'
// @ts-ignore
import bodyParser from 'body-parser'
// @ts-ignore
import cors from 'cors'
// @ts-ignore
import morgan from 'morgan'
// @ts-ignore
import passport from "passport";
import * as mongoose from "mongoose";

import { router as authRoutes } from './routes/auth.js'
import { router as analyticsRoutes } from './routes/anallytics.js'
import { router as categoryRoutes } from './routes/category.js'
import { router as orderRoutes } from './routes/order.js'
import { router as positionRoutes } from './routes/postion.js'
import { mongoURI } from "./config/keys.js";

import jwtStrategy from  './middleware/passport.js'

const app = express()

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.log(error))

app.use(passport.initialize())
jwtStrategy(passport)

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

export { app }