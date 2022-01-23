import express from 'express';
import { adminTest, userTest } from '../controllers/test.controller.js';
import { isAuthenticated, isAuthorizated } from '../helpers/middlewares/authentication.js';

const router = express.Router();

// Test routes
router.get('/adminData', isAuthenticated, isAuthorizated, adminTest);
router.get('/userData', isAuthenticated, userTest);

export default router;
