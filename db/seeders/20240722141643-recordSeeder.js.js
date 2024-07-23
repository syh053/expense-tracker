'use strict';

const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const t = await queryInterface.sequelize.transaction()

    const hash = bcrypt.hashSync('12345678', 10) // 雜湊處理(同步)

    try {
      await queryInterface.bulkInsert('users', [
        {
          name: '廣志',
          mail: 'user1@example.com',
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '小新',
          mail: 'user2@example.com',
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], { transaction: t })

      await queryInterface.bulkInsert('records', [
        {
          name: '午餐',
          date: new Date('2019-04-23'),
          amount: 60,
          userID: 1,
          categoryID: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '晚餐',
          date: new Date('2019-04-23'),
          amount: 60,
          userID: 1,
          categoryID: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '捷運',
          date: new Date('2019-04-23'),
          amount: 120,
          userID: 1,
          categoryID: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '電影:驚奇隊長',
          date: new Date('2019-04-23'),
          amount: 220,
          userID: 1,
          categoryID: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '租金',
          date: new Date('2019-04-01'),
          amount: 25000,
          userID: 1,
          categoryID: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], { transaction: t })

      await t.commit()
    } catch (error) {
      console.log(error)
      await t.rollback()
    }

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('records', null)
    await queryInterface.bulkDelete('users', null)

  }
};
