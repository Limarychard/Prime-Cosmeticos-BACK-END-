'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nome: { // este é o campo de nome para o meu produto
        type: Sequelize.STRING,
        allowNull: false
      },
      preço: { // este é o campo de preço para o produto
        type: Sequelize.INTEGER,
        allowNull: false
      },
      marcas: { // este é o campo de marcas para o meu produto
        type: Sequelize.STRING,
        allowNull: false
      },
      path: { // este é o campo de este campo é para adicionar imagens
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: { // este é o campo de created_at do usuário, que no caso indica quando o usuário foi criado
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: { // este é o campo de updated_at do usuário, que no caso indica quando o usuário foi atualizado
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products')
  }
}
