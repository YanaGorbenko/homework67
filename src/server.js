import express from 'express';
import authRouter from './routers/auth.js';
import tasksRouter from './routers/tasks.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { connectDb } from './db/connectDb.js';
import { errors } from 'celebrate';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/tasks', tasksRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);
await connectDb();

app.listen(PORT, error => {
  if (error) {
    console.log('Error with server starting!');
    return;
  }
  console.log(`Server in running at port ${PORT}`);
});

export default app;
