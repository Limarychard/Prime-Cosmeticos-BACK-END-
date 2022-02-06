import * as Yup from 'yup'
import { validateCep } from 'validations-br'

import Enderect from '../models/Enderect'

class EnderectController {
  async store (request, response) {
    const schema = Yup.object().shape({
      cep: Yup.string().required().test((value) => validateCep(value)),
      endereco: Yup.string().required(),
      numero: Yup.number().required(),
      complementos: Yup.string(),
      bairro: Yup.string().required(),
      cidade: Yup.string().required(),
      estado: Yup.string().required()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const {
      cep,
      endereco,
      numero,
      complementos,
      bairro,
      cidade,
      estado
    } = request.body

    const enderect = await Enderect.create({
      cep,
      endereco,
      numero,
      complementos,
      bairro,
      cidade,
      estado
    })

    return response.status(201).json(enderect)
  }

  async index (request, response) {
    const enderects = await Enderect.findAll()

    return response.json(enderects)
  }
}

export default new EnderectController()
