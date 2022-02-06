import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'

class User extends Model { // Aqui é meu models de criação de usuário
  static init (sequelize) {
    super.init({
      nome: Sequelize.STRING,
      cpf: Sequelize.STRING,
      rg: Sequelize.STRING,
      data_de_nascimento: Sequelize.STRING,
      sexo: Sequelize.ENUM('Mascuino', 'Feminino', 'Outros'),
      estado_civil: Sequelize.ENUM('Casado', 'Solteiro', 'Namorando'),
      celular_um: Sequelize.STRING,
      celular_dois: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      admin: Sequelize.BOOLEAN
    },
    {
      sequelize
    })

    this.addHook('beforeSave', async (user) => { // isto aqui é para criptografar a senha na hora de salvar no banco de dados
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10) // este número é o número de cryptografia, porém como estamos em processo de desenvolvimento ele vai servir apenas para teste, o ideal seria uns 50
      }
    })

    return this
  }

  checkPassword (password) { // aqui é para desriptografar a minha senha
    return bcrypt.compare(password, this.password_hash)
  }
}

export default User
