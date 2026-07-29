import { Router } from 'express';
import { mockTasks } from '../utils.js';
import { fetchSampleUsers } from '../api.js';

const router = Router();

// Cached users -- populated once when the server starts (see initUsers below),
// not re-fetched on every request to /api/users.
let cachedUsers = [];

export const initUsers = async () => {
    cachedUsers = await fetchSampleUsers();
    console.log(`Cached ${cachedUsers.length} users at startup.`);
};

// GET /api/tasks -- returns the mock task array
router.get('/tasks', (req, res) => {
    res.json(mockTasks);
});

// GET /api/tasks/:id -- returns the single matching task, or 404 if none found
router.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = mockTasks.find((t) => String(t.id) === String(id));

    if (!task) {
        return res.status(404).json({ error: `Task with id ${id} not found` });
    }

    res.json(task);
});

// GET /api/users -- returns the cached, transformed { id, name, email } user list
router.get('/users', (req, res) => {
    res.json(cachedUsers);
});

export default router;