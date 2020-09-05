// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

export interface CustomRequest extends Request{
  token?: string,
  user?: object,
}

// eslint-disable-next-line consistent-return
function authenticate(req:CustomRequest, res:Response, next:NextFunction) {
  const { token } = req;
  if (!token) {
    return res.status(204).json({ error: 'token can\'t be null' });
  }

  // eslint-disable-next-line consistent-return
  jwt.verify(token, authConfig.secret, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'error while authenticating the token' });
    }
    req.user = user;
    next();
  });
}

export default authenticate;
