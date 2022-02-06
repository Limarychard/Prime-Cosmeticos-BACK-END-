import Sequelize, { Model } from 'sequelize'

class Enderect extends Model {
  static init (sequelize) {
    super.init({
      cep: Sequelize.STRING,
      endereco: Sequelize.STRING,
      numero: Sequelize.INTEGER,
      complementos: Sequelize.STRING,
      bairro: Sequelize.STRING,
      cidade: Sequelize.STRING,
      estado: Sequelize.STRING
    },
    {
      sequelize
    })
    return this
  }
}

export default Enderect
