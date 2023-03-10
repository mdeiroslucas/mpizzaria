import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import { router } from './routes'

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..','tmp'))
)

app.use((err: Error, request: Request, response: Response) => {
  if(err instanceof Error) {
    return response.status(400).json({
      error: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Alguma coisa deu errada.'
  })
})

app.listen(3000, () => console.log('servidor online! Pronto para ser usado'));