'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Insert 3 Users
    await queryInterface.bulkInsert('Users', [
      { name: 'Alice Smith', email: 'alice@example.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bob Jones', email: 'bob@example.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Charlie Brown', email: 'charlie@example.com', createdAt: new Date(), updatedAt: new Date() }
    ]);

    // 2. Fetch the dynamically generated user IDs directly from Postgres
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users";'
    );
    const userRows = users[0]; // Array of the inserted users

    // 3. Insert 5 Tasks, dynamically assigning the userIds we just fetched
    await queryInterface.bulkInsert('Tasks', [
      { title: 'Setup PostgreSQL', completed: true, dueDate: new Date(), userId: userRows[0].id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Write Sequelize Models', completed: true, dueDate: new Date(), userId: userRows[0].id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Create Associations', completed: false, dueDate: new Date(), userId: userRows[1].id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Run DB Seeders', completed: false, dueDate: new Date(), userId: userRows[1].id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Submit Graded Task 8', completed: false, dueDate: new Date(), userId: userRows[2].id, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Revert logic: delete tasks first (foreign key dependency), then users
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};