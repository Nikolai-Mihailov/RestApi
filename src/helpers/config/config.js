import dotenv from 'dotenv';

dotenv.config();

export const SERVER = {
  HOSTNAME: process.env.SERVER_HOSTNAME || 'localhost',
  PORT: process.env.SERVER_PORT || 7878,
};

export const SALT = process.env.SALT;

const { NODE_ENV = 'develompment' } = process.env;

export const IN_PROD = NODE_ENV === 'production';
