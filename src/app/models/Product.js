import Sequelize, { Model } from 'sequelize'

class Product extends Model {
  static init (sequelize) {
    super.init({
      nome: Sequelize.STRING,
      preço: Sequelize.INTEGER,
      path: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
        get () {
          return `http://localhost:6000/product-file/${this.path}`
        }
      }
    },
    {
      sequelize
    })
    return this
  }

  static associate (models) {
    this.belongsTo(models.Marca, {
      foreignKey: 'marcas_id',
      as: 'marca'
    })
  }
}

export default Product
