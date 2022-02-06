'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'marcas')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.createColumn('products', {
      marcas: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  }
}
