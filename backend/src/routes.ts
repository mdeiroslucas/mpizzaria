import {Router,Request, Response } from 'express';
import {CreateUserController} from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAutheticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import ListCategoryController from './controllers/category/ListCategoryController';


const router = Router();

//User routers

router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

//Category routers
router.post('/category', isAuthenticated, new CreateCategoryController().handle);

router.get('/category' ,isAuthenticated, new ListCategoryController().handle)
export {router}; 