'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     const { INTEGER, DATE, STRING } = Sequelize;
     await queryInterface.createTable('users', {
       id: { type: INTEGER, primaryKey: true, },
       name: STRING(30),
       account: STRING(30),
       password: STRING(30),
       email: STRING(100),
       avatar_url: STRING(200),
       web_url: STRING(200),
       workspace: STRING(200),
       created_at: DATE,
       updated_at: DATE,
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('users');
  }
};
