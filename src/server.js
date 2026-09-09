import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.js';
import authRouter from './routes/auth.cjs'; 

const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());

    app.use('/api', router);
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