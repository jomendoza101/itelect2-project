import 'dotenv/config';
import express from 'express';
import router, { initUsers } from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    // Fetch and cache the sample users once, before the server starts accepting requests.
    await initUsers();

    app.use('/api', router);

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();