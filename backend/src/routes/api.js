import { Router } from 'express';
import userRouter from './userRouter.js'

// Export the base-router
const baseRouter = Router();


// Setup routers
baseRouter.use('/users', userRouter);

// Export default.
export default baseRouter;