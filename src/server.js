import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// 1. Changed from './routes/index.js' to the new file you created
import taskRouter from './routes/tasks.js';
import authRouter from './routes/auth.cjs'; 

const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());

    // 2. Updated to use taskRouter instead of the old router
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