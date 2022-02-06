import { v4 } from 'uuid'
import * as Yup from 'yup'
import { validateCPF, validatePhone } from 'validations-br'

import User from '../models/User'

class UserController { // isso aqui é para validar os dados, cajo algum dado esteja errado ele nao vai criar o usuário...
  async store (request, response) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf: Yup.string().required().test((value) => validateCPF(value)),
      rg: Yup.string().required().max(12).min(12),
      data_de_nascimento: Yup.string().required().min(10).max(10),
      sexo: Yup.string('Masculino', 'Feminino', 'Outros').required(),
      estado_civil: Yup.string('Casado', 'Solteiro', 'Namorando').required(),
      celular_um: Yup.string().required().test((value) => validatePhone(value)),
      celular_dois: Yup.string().test((value) => validatePhone(value)),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8),
      admin: Yup.boolean()
    })

    try { // isso é para caso o usuário na hora que for se cadastrar errar algum tipo de dado, o sistema vai ajudar ele mostrando qual dado está errado
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const {
      nome,
      cpf,
      rg,
      data_de_nascimento,
      sexo,
      estado_civil,
      celular_um,
      celular_dois,
      email,
      password,
      admin
    } = request.body

    const userExists = await User.findOne({ // este é para pesquisar caso o usuário já exista
      where: {
        cpf,
        rg,
        celular_um,
        celular_dois,
        email
      }
    })

    if (userExists) {
      return response.status(400).json({ error: 'Esse usuário foi encontrado no nosso banco de dados, ou seja ele já existe' })
    }

    const user = await User.create({ // este aqui é para criar
      id: v4(),
      nome,
      cpf,
      rg,
      data_de_nascimento,
      sexo,
      estado_civil,
      celular_um,
      celular_dois,
      email,
      password,
      admin
    })

    return response.status(201).json({ id: user.id, nome, email, admin })
  }
}

export default new UserController()
