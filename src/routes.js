import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import SessionController from './app/controllers/SessionController'
import UserController from './app/controllers/UserController'
import ProductController from './app/controllers/ProductController'
import MarcaController from './app/controllers/MarcaController'
import EnderectController from './app/controllers/EnderectController'

import authMiddleware from './app/middlewares/auth'

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', UserController.store) // está é minha rota de criação de usuário

routes.post('/sessions', SessionController.store) // está é minha rota de login

routes.use(authMiddleware) // será chamado por todas as rotas abaixo

routes.post('/products', upload.single('file'), ProductController.store) // está é minha rota de criação de produtos.
routes.get('/products', ProductController.index) // está é minha rota para requisitar o produto

routes.post('/marcas', MarcaController.store) // está é minha rota de criação de marcas
routes.get('/marcas', MarcaController.index) // está é minha rota para requisitar a marca

routes.post('/enderects', EnderectController.store) // está é minha rota de criação de endereços
routes.get('/enderects', EnderectController.index) // está é minha rota para requisitar o endereço

export default routes
