import Sequelize from 'sequelize'

import Enderect from '../app/models/Enderect'
import Product from '../app/models/Product'
import User from '../app/models/User'
import Marca from '../app/models/Marca'

import configDatabase from '../config/database'

const models = [User, Product, Enderect, Marca]

class Database {
  constructor () {
    this.init()
  }

  init () {
    this.connection = new Sequelize(configDatabase)
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models))
  }
}

export default new Database()
