import express from 'express';
import { addOne, getAll, getOneById, removeOne, updateOne } from '../controllers/fishController';
import ensureIsAuthenticated from '../helpers/authGuard';
let fishRouter = express.Router();

fishRouter.post('/', ensureIsAuthenticated, addOne);
fishRouter.get('/', getAll);
fishRouter.get('/:id', getOneById);
fishRouter.put('/:id', ensureIsAuthenticated, updateOne);
fishRouter.delete('/:id', ensureIsAuthenticated, removeOne);

export default fishRouter;
