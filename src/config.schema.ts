import * as Joi from '@hapi/joi';
import { CookieOptions } from 'express';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().required(),

  //Database
  DB_DATABASE_1: Joi.string().required(),
  DB_PASSWORD_1: Joi.string().required(),

  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  JWT_COOKIE_EXPIRES_IN: Joi.number().default(90),

  //Social Login
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_SECRET: Joi.string().required(),

  /** 
  // Email Configuaration
  MAIL_HOST: Joi.string().required(),
  MAIL_USER: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
  MAIL_FROM: Joi.string().required(),
  EMAIL_PORT: Joi.number().required(),

  */
});

export const cookieOptions: CookieOptions = {
  domain: 'coverfanz-backend.herokuapp.com',
  secure: true,
  sameSite: 'strict',
  httpOnly: true,
  path: '/',
};
