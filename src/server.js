import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router, { initUsers } from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    // Fetch and cache the sample users once, before the server starts accepting requests.
    await initUsers();

    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());

    app.use('/api', router);

    // Error-handling middleware -- must be defined last (4 params tells Express
    // this is an error handler). Catches anything passed to next(err), plus
    // errors thrown inside async route handlers via Express 5's built-in
    // promise handling.
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    });

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();