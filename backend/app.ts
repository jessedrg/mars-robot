import { app as input } from './routes/input-route';
import { NotFoundError } from './errors/not-found-error';
import express from 'express';
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(input);
app.all('*', (req, res) => {
  throw new NotFoundError();
});
