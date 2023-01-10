// @ts-ignore
import multer, {FileFilterCallback} from 'multer'
// @ts-ignore
import moment from 'moment'
import { Request, Express } from 'express'

const storage = multer.diskStorage({
    destination(req: Request, file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) {
        cb(null, 'uploads/')
    },
    filename(req: Request, file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    },
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}

export default multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
})