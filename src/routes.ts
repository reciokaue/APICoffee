import { Router } from 'express'
import ProductsController from './controllers/ProductsController'

import multer from 'multer'
import uploadConfig from './config/upload'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/products', ProductsController.index) 
routes.get('/products/:id', ProductsController.show) 

routes.post('/products', upload.array('images'),ProductsController.create) 

export default routes