import { Router } from 'express';
import { closeTurn, getBoxCut, openTurn } from './boxcut.controller';

const router = Router();

router.get('/',getBoxCut);
router.post('/open', openTurn);
router.put('/close/:id', closeTurn);
export default router;
