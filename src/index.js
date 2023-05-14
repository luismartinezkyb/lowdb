import express from 'express';
import taskRoutes from './routes/tasks.js';

//importamos la funcion desde database
import {createConnection} from './database/database.js';

createConnection();

const app = express();

const port=process.env.PORT || 3001;

app.use(express.json());

app.use('/api', taskRoutes);


app.listen(port, (err, res) => console.log(`listening on port ${port}`));