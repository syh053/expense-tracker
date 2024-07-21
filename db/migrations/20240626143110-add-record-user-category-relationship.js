'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('records', 'userID', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

    await queryInterface.addColumn('records', 'categoryID', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'categorys',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('records', 'userID')
    await queryInterface.removeColumn('records', 'categoryID')
  }
}
