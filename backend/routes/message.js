import express from 'express';
import { add } from '../controllers/messageController';
import ensureIsAuthenticated from '../helpers/authGuard';
let messageRouter = express.Router();

messageRouter.post('/', ensureIsAuthenticated, add);

export default messageRouter;
