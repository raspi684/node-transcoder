import * as express from 'express';
import appRoutes from './app/routes/routes';
import { errorHandlerMiddleware, notFoundMiddleware } from './app/middlewares';

const app = express();

app.use('/api', appRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
