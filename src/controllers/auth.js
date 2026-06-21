import createHttpError from 'http-errors';
import {
  createSession,
  createUser,
  findUserByEmail,
  deleteSessionByUserId,
  deleteSessionById,
  findSessionById,
} from '../services/auth.js';
import bcrypt from 'bcrypt';
import { clearCookies, setCookies } from '../utils/index.js';

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await findUserByEmail(email);

  if (user) {
    throw createHttpError(409, 'User with such email already exists!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({ name, email, password: hashedPassword });

  const session = await createSession(newUser._id);

  setCookies(session, res);

  res.status(201).json({ name: newUser.name, email: newUser.email });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const arePasswordsEqual = await bcrypt.compare(password, user.password);

  if (!arePasswordsEqual) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await deleteSessionByUserId(user._id);

  const session = await createSession(user._id);

  setCookies(session, res);

  res.status(200).json({ name: user.name, email });
};

export const logout = async (req, res) => {
  const { sessionId } = req.cookies;

  await deleteSessionById(sessionId);

  clearCookies(res);

  res.sendStatus(204);
};

export const refreshSession = async (req, res) => {
  const { sessionId } = req.cookies;

  const session = await findSessionById(sessionId);

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isRefreshTokenValid = session.refreshTokenExpiresAt > new Date();

  if (!isRefreshTokenValid) {
    await deleteSessionById(session._id);
    clearCookies(res);
    throw createHttpError(401, 'Refresh token not valid');
  }

  await deleteSessionById(session._id);

  const newSession = await createSession(session.userId);

  setCookies(newSession, res);

  res.sendStatus(204);
};
