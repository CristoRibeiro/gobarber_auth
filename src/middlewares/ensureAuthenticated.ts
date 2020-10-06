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
): Response | any {
  const authHeader = request.headers.authorization;
  try {
    if (!authHeader) {
      throw new Error('Token is missing.');
    }
    const [, token] = authHeader.split(' ');

    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayload;

    request.user = { id: sub };

    return next();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
}

export default ensureAuthenticatedMiddlewares;
