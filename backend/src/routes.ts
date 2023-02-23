import {Router,Request, Response } from 'express';


const router = Router();

router.get('/teste', (req: Request, res: Response) => {
  return res.json({ok: true})
})


router.get('/teste2', (req: Request, res: Response) => {
  return res.json(
    'esta tudo: certo'
  )
})

export {router}; 