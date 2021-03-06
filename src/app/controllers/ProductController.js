import * as Yup from 'yup'
import Product from '../models/Product'
import Marca from '../models/Marca'

class ProductController {
  async store (request, response) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required(),
        preço: Yup.number().required(),
        marcas_id: Yup.number().required()
      })

      try {
        await schema.validateSync(request.body, { abortEarly: false })
      } catch (err) {
        return response.status(400).json({ error: err.errors })
      }

      const { filename: path } = request.file
      const { nome, preço, marcas_id } = request.body

      const product = await Product.create({
        nome,
        preço,
        marcas_id,
        path
      })

      return response.json(product)
    } catch (err) {
      console.log(err)
    }
  }

  async index (request, response) {
    const products = await Product.findAll({
      include: [
        {
          model: Marca,
          as: 'marca',
          attributes: ['id', 'nome']
        }
      ]
    })

    return response.json(products)
  }
}

export default new ProductController()
