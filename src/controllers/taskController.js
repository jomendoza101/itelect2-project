import { validateTask, mergeTaskUpdate } from '../utils.js';
import db from '../../models/index.cjs';

const { Task, User } = db;

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ include: User });
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

export const getTaskById = async (req, res) => {
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
};

export const createTask = async (req, res) => {
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
};

export const updateTask = async (req, res) => {
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
};

export const deleteTask = async (req, res) => {
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
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};