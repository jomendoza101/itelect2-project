// app.js - Main application entry point
console.log('Server starting...'); 

import { formatDate, validateTask, mergeTaskUpdate } from './utils.js';

console.log(formatDate(new Date("2026-07-22")));

console.log(validateTask());

console.log(
    validateTask({
        title: "Finish Assignment",
        dueDate: "2026-07-22"
    })
);

console.log(
    mergeTaskUpdate(
        { title: "Old", dueDate: "2026-07-22"},
        { title: "New"}
    )
);