'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products',
      'marcas_id', {
        type: Sequelize.INTEGER,
        references: { model: 'marcas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'marcas_id')
  }
}
