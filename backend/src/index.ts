import { Request, Response, Application } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { router } from './routes';
import morgan from 'morgan';
import express from 'express';

const app: Application = express();

const port: number = 3000;
const address: string = '127.0.0.1';


app.use(morgan('tiny'));
app.use(json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', router);

// First route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello world' });
})


// Starting server
app.listen(port, address, () => {
  console.log(`API running on ${address}:${port}`)
});