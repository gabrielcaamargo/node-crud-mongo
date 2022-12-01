import express from 'express';
import mongoose from 'mongoose';

import router from './routes';

mongoose.connect('mongodb://localhost:27017')
  .then(() => console.log('Connected to mongo'))
  .catch(() => console.log('Failed when connecting to mongo'));

const app = express();
app.use(express.json());
app.use(router);
app.listen(3000, () => console.log('Server started at localhost:3000'));