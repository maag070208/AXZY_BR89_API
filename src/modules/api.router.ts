import { Router } from 'express';

import indexRoute from './index.routes';
import userRoute from './users/users.routes';
import boxcutRoute from './box-cut/boxcut.routes';
const apiRouter = Router();

apiRouter.use('/', indexRoute);
apiRouter.use('/users', userRoute);
apiRouter.use('/boxcut', boxcutRoute);

export default apiRouter;
