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