import { Router } from 'express';
import { mockTasks, validateTask, mergeTaskUpdate } from '../utils.js';
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

// POST /api/tasks -- validates the request body with validateTask(), then
// creates and stores a new task. 400 if invalid, 201 with the new task if valid.
router.post('/tasks', (req, res) => {
    const taskData = req.body;

    if (!validateTask(taskData)) {
        return res.status(400).json({ error: 'Invalid task data: title and dueDate are required' });
    }

    const nextId = mockTasks.length
        ? Math.max(...mockTasks.map((t) => t.id)) + 1
        : 1;

    const newTask = {
        id: nextId,
        completed: false,
        ...taskData,
    };

    mockTasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /api/tasks/:id -- finds the task by id (404 if missing), applies the
// update with mergeTaskUpdate(), and returns the merged task with 200.
router.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = mockTasks.findIndex((t) => String(t.id) === String(id));

    if (taskIndex === -1) {
        return res.status(404).json({ error: `Task with id ${id} not found` });
    }

    const updatedTask = mergeTaskUpdate(mockTasks[taskIndex], req.body);
    mockTasks[taskIndex] = updatedTask;

    res.status(200).json(updatedTask);
});

// DELETE /api/tasks/:id -- 404 if no task matches, otherwise removes it and
// returns 200 with a confirmation message.
router.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = mockTasks.findIndex((t) => String(t.id) === String(id));

    if (taskIndex === -1) {
        return res.status(404).json({ error: `Task with id ${id} not found` });
    }

    const [deletedTask] = mockTasks.splice(taskIndex, 1);

    res.status(200).json({
        message: `Task with id ${id} deleted successfully`,
        task: deletedTask,
    });
});

// GET /api/users -- returns the cached, transformed { id, name, email } user list
router.get('/users', (req, res) => {
    res.json(cachedUsers);
});

export default router;