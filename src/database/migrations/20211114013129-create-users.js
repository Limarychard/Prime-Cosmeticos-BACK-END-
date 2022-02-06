'use strict'

module.exports = { // aqui é minha migrations, que serve como se fosse minha tabela de banco de dados
  up: async (queryInterface, Sequelize) => { // este UP serve para enviar nossa tabela
    await queryInterface.createTable('users', {

      id: { // este é o campo de id do usuário
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },

      nome: { // este é o campo de nome do usuário
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf: { // este é o campo de cpf do usuário
        type: Sequelize.STRING,
        defaultValue: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      rg: { // este é o campo de rg do usuário
        type: Sequelize.STRING,
        defaultValue: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      data_de_nascimento: { // este é o campo de data do nascimento do usuário
        type: Sequelize.STRING,
        allowNull: false
      },
      sexo: { // este é o campo de sexo do usuário KKK
        type: Sequelize.ENUM('Masculino', 'Feminino', 'Outros'),
        allowNull: false
      },
      estado_civil: { // este é o campo de estado civil do usuário
        type: Sequelize.ENUM('Casado', 'Solteiro', 'Namorando'),
        allowNull: false
      },
      celular_um: { // este é o campo de celular(1) do usuário
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      celular_dois: { // este é o campo de celular(2) do usuário
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
        primaryKey: true
      },
      email: { // este é o campo de email do usuário
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password_hash: { // este é o campo de senha do usuário
        type: Sequelize.STRING,
        allowNull: false
      },
      admin: { // este é o campo de admin do usuário ( POUCOS USUÁRIOS VÃO SER ADMIN )
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

  down: async (queryInterface) => { // este down vai para caso queremos deletar a tabela
    await queryInterface.dropTable('users')
  }
}
