import { NextApiRequest, NextApiResponse } from 'next';
import { sequelize } from '../../../app/database';
import userRoutes from '@/app/routes/useRoutes';

const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

export default (req: NextApiRequest, res: NextApiResponse) => {
  app(req, res);
};

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));
