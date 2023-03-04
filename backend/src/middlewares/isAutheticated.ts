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
    //validate the token
    const { sub } = verify(
      token, 
      process.env.JWT_SECRET as string
    ) as PayLoad;

    //recover the token id and put it inside of a variable user_id
    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}