import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  let decoded;

  try {
    decoded = jwt.verify(token, secret) as JwtPayload;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized!');
  }

  return decoded;
};
