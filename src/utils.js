export const formatDate = (date) => `Due: ${date.toLocaleDateString('en-US')}`;

export const validateTask = ({ title, dueDate } = {}) => {
    return Boolean(title && dueDate);
}

export const mergeTaskUpdate = (original, ...updates) => {
    return Object.assign({}, original, ...updates);
}

export class TaskValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "TaskValidationError";
    }
}

export const createTask = (taskData) => {
    if (!validateTask(taskData)) {
        throw new TaskValidationError("Invalid task data");
    }
    
    return {
        id: Date.now(),
        completed: false,
        ...taskData
    };
}

export const mockTasks = [
    { id: 1, title: "Finish Assignment", dueDate: "2026-07-22", completed: false },
    { id: 2, title: "Review Pull Request", dueDate: "2026-07-24", completed: true },
    { id: 3, title: "Fix Cracking Shoulder", dueDate: "2026-07-25", completed: false },
];