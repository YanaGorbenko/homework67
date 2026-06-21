import { TWENTY_MINUTES, TWO_DAYS } from '../constants/index.js';
import { Session } from '../db/models/Session.js';
import { User } from '../db/models/User.js';
import { randomBytes } from 'node:crypto';

export const findUserByEmail = email => User.findOne({ email });

export const createUser = userData => User.create(userData);

export const createSession = userId => {
  const session = {
    userId,
    accessToken: randomBytes(30).toString('base64'),
    accessTokenExpiresAt: Date.now() + TWENTY_MINUTES,
    refreshToken: randomBytes(30).toString('base64'),
    refreshTokenExpiresAt: Date.now() + TWO_DAYS,
  };

  return Session.create(session);
};

export const deleteSessionByUserId = userId => Session.deleteOne({ userId });

export const deleteSessionById = sessionId =>
  Session.deleteOne({ _id: sessionId });

export const findSessionById = id => Session.findById(id);

export const findUserById = id => User.findById(id);
