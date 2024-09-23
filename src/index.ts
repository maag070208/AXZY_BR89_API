import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import YAML from 'yamljs';
import fileUpload from 'express-fileupload';

//middlewares
import { apiValidator } from '@src/core/middlewares/schema-validator.middleware';
import { createTResult } from '@src/core/mappers/tresult.mapper';

//router
import apiRouter from '@src/modules/api.router';
import bodyParser from 'body-parser';
import path from 'path';

//server
const app = express();

const PORT = 4321; 
const publicFolderPath = path.join(__dirname, "../public");
app.use(express.static(publicFolderPath));
app.use(fileUpload());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use('/swagger', swaggerUi.serve as any, (req: any, res: any, next: any) => {
  const swaggerDocument = YAML.load('./swagger.yaml');
  const swaggerUiHandler = swaggerUi.setup(swaggerDocument);
  swaggerUiHandler(req, res, next);
});

app.use(apiValidator());

app.use('/api/v1', apiRouter);

app.use((err: any, res: express.Response) => {
  console.log({ err });
  console.log({ err: err.errors });
  res
    .status(err.status || 500)
    .json(createTResult<any>(null, [err.message, err.errors]));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
