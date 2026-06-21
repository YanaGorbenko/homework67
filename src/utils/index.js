import { TWENTY_MINUTES, TWO_DAYS } from '../constants/index.js';

export const setCookies = (session, res) => {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };
  res.cookie('sessionId', session._id, { ...options, maxAge: TWO_DAYS });
  res.cookie('accessToken', session.accessToken, {
    ...options,
    maxAge: TWENTY_MINUTES,
  });
  res.cookie('refreshToken', session.refreshToken, {
    ...options,
    maxAge: TWO_DAYS,
  });
};

export const clearCookies = res => {
  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
};
