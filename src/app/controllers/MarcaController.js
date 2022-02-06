import * as Yup from 'yup'
import Marca from '../models/Marca'

class MarcaController {
  async store (request, response) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required()
      })

      try {
        await schema.validateSync(request.body, { abortEarly: false })
      } catch (err) {
        return response.status(400).json({ error: err.errors })
      }

      const { nome } = request.body

      const marcaExists = await Marca.findOne({
        where: {
          nome
        }
      })

      if (marcaExists) {
        return response.status(400).json({ error: 'Essa marca já existe no nosso banco de dados' })
      }

      const { id } = await Marca.create({ nome })

      return response.json({ nome, id })
    } catch (err) {
      console.log(err)
    }
  }

  async index (request, response) {
    const marcas = await Marca.findAll()

    return response.json(marcas)
  }
}

export default new MarcaController()
