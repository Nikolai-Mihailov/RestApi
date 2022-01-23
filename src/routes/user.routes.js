import express from 'express';
import { singnUp, logIn, logOut, refreshToken, confirmEmail } from '../controllers/users.controller.js';
import { isAuthenticated, isAuthorizated } from '../helpers/middlewares/authentication.js';

const router = express.Router();

router.post('/signup', singnUp);
router.post('/login', logIn);
router.post('/logout', isAuthenticated, isAuthorizated, logOut);
router.post('/refresh_token/', isAuthenticated, refreshToken);
router.get('/confirm-email/:token', confirmEmail);

export default router;
