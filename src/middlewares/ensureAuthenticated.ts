import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import authConfig from '../config/auth';

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

function ensureAuthenticatedMiddlewares(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token is missing.');
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayload;

    request.user = { id: sub };

    return next();
  } catch (error) {
    throw new Error('Invalid token.');
  }
}

export default ensureAuthenticatedMiddlewares;
