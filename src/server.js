import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import taskRouter from './routes/tasks.js';
import authRouter from './routes/auth.cjs'; 

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [process.env.CORS_ORIGIN];

const startServer = async () => {
    app.use(cors({ origin: allowedOrigins }));
    app.use(morgan('dev'));
    app.use(express.json());

    app.use('/api', taskRouter);
    app.use('/api/auth', authRouter); 

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    });

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();