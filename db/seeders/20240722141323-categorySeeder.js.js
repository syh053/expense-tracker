'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('categorys', [
      {
        name: '家居物業',
        pattern: '<i class="fa-solid fa-house"></i>',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '交通出行',
        pattern: '<i class="fa-solid fa-van-shuttle"></i>',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '休閒娛樂',
        pattern: '<i class="fa-solid fa-face-grin-beam"></i>',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '餐飲食品',
        pattern: '<i class="fa-solid fa-utensils"></i>',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '其他',
        pattern: '<i class="fa-solid fa-pen"></i>',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    console.log('categorys TABLE 建立成功')

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('categorys', null)

  }
};
