import express from 'express';
import usersRoutes from './user.routes.js';
import testRoutes from './test.routes.js';

const router = express.Router();

router.use('/user', usersRoutes);
router.use('/test', testRoutes);

export default router;
