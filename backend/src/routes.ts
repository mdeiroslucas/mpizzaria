import {Router,Request, Response } from 'express';
import {CreateUserController} from './controllers/user/CreateUserController';


const router = Router();

router.get('/teste', (req: Request, res: Response) => {
  return res.json({ok: true})
})

router.post('/users', new CreateUserController().handle)


router.get('/teste2', (req: Request, res: Response) => {
  return res.json(
    'esta tudo: certo'
  )
})

export {router}; 