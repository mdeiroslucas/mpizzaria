import {NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken'


interface PayLoad {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if(!authToken) {
    return res.status(401).end();
  }
  
  const [, token] = (authToken).split(" ");
  
  if (!token) {
    return res.status(401).end();
  }

  try {
    //validar esse token
    const { sub } = verify(
      token, 
      process.env.JWT_SECRET as string
    ) as PayLoad;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}