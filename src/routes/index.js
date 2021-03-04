import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { indexPage, charactersGetAll, charactersGetOne } from '../controllers';
import { swaggerDocument } from '../docs';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/characters', charactersGetAll);
indexRouter.get('/characters/:id', charactersGetOne);

indexRouter.use('/docs', swaggerUi.serve);
indexRouter.get('/docs', swaggerUi.setup(swaggerDocument));

export default indexRouter;
