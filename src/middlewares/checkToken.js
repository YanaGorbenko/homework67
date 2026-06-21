import createHttpError from 'http-errors';
import { findSessionById, findUserById } from '../services/auth.js';

export const checkToken = async (req, res, next) => {
  const { accessToken, sessionId } = req.cookies;

  if (!accessToken || !sessionId) {
    throw createHttpError(401);
  }

  const session = await findSessionById(sessionId);

  if (!session) {
    throw createHttpError(401);
  }

  const isAccessTokenValid = session.accessTokenExpiresAt > new Date();

  if (!isAccessTokenValid) {
    throw createHttpError(401);
  }

  const user = await findUserById(session.userId);

  if (!user) {
    throw createHttpError(401);
  }

  req.user = user;

  next();
};
