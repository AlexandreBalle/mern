import express from 'express';
import { add, getAll, getOneById, remove, update } from '../controllers/playerController';
let playerRouter = express.Router();

playerRouter.post('/', add);
playerRouter.get('/', getAll);
playerRouter.get('/:id', getOneById);
playerRouter.put('/:id', update);
playerRouter.delete('/:id', remove);

export default playerRouter;
