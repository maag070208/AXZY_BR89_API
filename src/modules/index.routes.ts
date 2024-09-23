import { helloWorld, upload } from '@src/modules/index.controller';
import { Router } from 'express';

const router = Router();
router.get('/', helloWorld);
router.post('/upload', upload);

export default router;
