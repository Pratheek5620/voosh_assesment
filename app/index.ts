import express, { Application, Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import userRoutes from '../app/routes/useRoutes';

const app: Application = express();
const port: number = 3000;

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Trello Clone!');
});

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));
