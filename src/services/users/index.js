import prisma from '../../helpers/prisma-client.js';
import bycript from 'bcrypt';
import pkg from 'jsonwebtoken';
import { SALT } from '../../helpers/config/config.js';
import {
	createAccessToken as createAccessTokenFunction,
	createRefreshToken as createRefreshTokenFunction,
	createEmailAccessToken as createEmailAccessTokenFunction
} from '../../helpers/auth/index.js';
const { verify, decode } = pkg;
import logger from '../../helpers/config/logger.js';

import { createUserFactory } from './create-user.js';
const createUser = createUserFactory({ prisma, bycript, createEmailAccessTokenFunction, SALT, decode, logger });

import { loginUserFactory } from './login-user.js';
const loginUser = loginUserFactory({ prisma, bycript, createAccessTokenFunction, createRefreshTokenFunction });

import { createRefreshTokenFactory } from './create-refresh-tocken.js';
const createRefreshToken = createRefreshTokenFactory({ prisma, verify });

import { confirmEmailFactory } from './confirm-email.js';
const confirmEmail = confirmEmailFactory({ prisma, verify });

import { deleteUserFactory } from './delete-user.js';
const delateUser = deleteUserFactory({ prisma, logger })

export { createUser, loginUser, createRefreshToken, confirmEmail, delateUser };
