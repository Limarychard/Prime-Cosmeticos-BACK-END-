'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('enderects', {
      id: {
        type: Sequelize.UUID
      },
      cep: { // este é o campo de created_at do usuário, que no caso indica quando o usuário foi criado
        type: Sequelize.STRING,
        allowNull: false
      },
      endereco: { // este é o campo de created_at do usuário, que no caso indica quando o usuário foi criado
        type: Sequelize.STRING,
        allowNull: false
      },
      numero: { // este é o campo de created_at do usuário, que no caso indica quando o usuário foi criado
        type: Sequelize.INTEGER,
        allowNull: false
      },
      complementos: { // este é o campo de created_at do usuário, que no caso indica quando o usuário foi criado
        type: Sequelize.STRING,
        allowNull: true
      },
      bairro: { // este é o campo de created_at do usuário, que no caso indica quando o usuário foi criado
        type: Sequelize.STRING,
        allowNull: false
      },
      cidade: { // este é o campo de created_at do usuário, que no caso indica quando o usuário foi criado
        type: Sequelize.STRING,
        allowNull: false
      },
      estado: { // este é o campo de created_at do usuário, que no caso indica quando o usuário foi criado
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
    },
    {
      freezeTableName: true
    }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('enderects')
  }
}
