import { Router } from 'express';
import { create, get, getAll, login, remove, update } from './users.controller';

const router = Router();

router.get('/', getAll);
router.post('/', create);

router.get('/:id', get);
router.put('/:id', update);
router.delete('/:id', remove);

router.post('/login', login);

export default router;
