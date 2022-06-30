'use strict';

const {
  faker
} = require('@faker-js/faker');

let seed = []
for (let i = 0; i < 20; i++) {
  seed.push({
    id_product_img: faker.random.numeric(),
    url_img: "url_image_fake",
    createdAt: new Date(),
    updatedAt: new Date(),
    data_status: 1
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('image_product', seed)
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('image_product');
  }
};