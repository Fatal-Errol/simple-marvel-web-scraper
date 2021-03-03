import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';

import indexRouter from './routes/index';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', indexRouter);

/* eslint-disable no-unused-vars */
// I need next here to be recognized as an error handler
app.use((err, req, res, next) => {
  res.status(400).json({
    code: 400,
    error: err.message,
    trace: err.stack
  });
});
/* eslint-enable no-unused-vars */

export default app;
