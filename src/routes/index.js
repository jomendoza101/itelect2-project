import { Router } from 'express';
import { validateTask, mergeTaskUpdate } from '../utils.js';
import db from '../../models/index.cjs';

const { Task, User } = db;

const router = Router();

// GET /api/tasks -- required JOIN query, returns each task with its owning user
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.findAll({ include: User });
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// GET /api/tasks/:id -- returns the single matching task, or 404 if none found
router.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ error: `Task with id ${id} not found` });
        }

        res.json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ error: 'Failed to fetch task' });
    }
});

// POST /api/tasks -- validates the request body with validateTask(), then
// creates a new task via Sequelize. 400 if invalid, 201 with the new task if valid.
router.post('/tasks', async (req, res) => {
    const taskData = req.body;

    if (!validateTask(taskData)) {
        return res.status(400).json({ error: 'Invalid task data: title and dueDate are required' });
    }

    try {
        const newTask = await Task.create({
            completed: false,
            ...taskData,
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(400).json({ error: 'Failed to create task' });
    }
});

// PUT /api/tasks/:id -- finds the task by id (404 if missing), applies the
// update with mergeTaskUpdate(), and returns the merged task with 200.
router.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ error: `Task with id ${id} not found` });
        }

        const mergedData = mergeTaskUpdate(task.toJSON(), req.body);
        await task.update(mergedData);

        res.status(200).json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(400).json({ error: 'Failed to update task' });
    }
});

// DELETE /api/tasks/:id -- 404 if no task matches, otherwise removes it and
// returns 200 with a confirmation message.
router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ error: `Task with id ${id} not found` });
        }

        await task.destroy();

        res.status(200).json({
            message: `Task with id ${id} deleted successfully`,
            task,
        });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// GET /api/users -- now backed by PostgreSQL instead of the jsonplaceholder mock fetch
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

export default router;