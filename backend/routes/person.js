import express from 'express';
import { login, signUp } from '../controllers/personController';
let personRouter = express.Router();

personRouter.post('/', signUp);
personRouter.post('/login', login);

export default personRouter;
