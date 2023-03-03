import {Router,Request, Response } from 'express';
import {CreateUserController} from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAutheticated';


const router = Router();

router.get('/teste', (req: Request, res: Response) => {
  return res.json({ok: true})
})

router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

router.get('/teste2', (req: Request, res: Response) => {
  return res.json(
    'esta tudo: certo'
  )
})

export {router}; 