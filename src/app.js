import { fetchSampleUsers } from './api.js';
import { formatDate, validateTask, mergeTaskUpdate, createTask } from './utils.js';

console.log('Server starting...'); 

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

try {
    console.log('\n--- Fetching Sample Users ---');
    const users = await fetchSampleUsers();
    console.log('Sample Users Result:', users);

    console.log('\n--- Attempting Task Creation ---');
    const sampleTaskData = {
        title: "Fix Cracking Shoulder",
        dueDate: "2026-07-25"
    };
    
    const newTask = createTask(sampleTaskData);
    console.log('Successfully Created Task:', newTask);

} catch (error) {
    console.error('An error occurred during app execution:', error.message);
}