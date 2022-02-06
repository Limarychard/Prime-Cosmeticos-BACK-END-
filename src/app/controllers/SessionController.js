// este é o meu Controller de Login de usuário

import jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import { validateCPF } from 'validations-br'

import User from '../models/User'
import authConfig from '../../config/auth'

class SessionController {
  async store (request, response) {
    const schema = Yup.object().shape({
      cpf: Yup.string().required().test((value) => validateCPF(value)),
      password: Yup.string().required()
    })

    const userEmailOrPasswordIncorrect = () => { // Aqui é apenas a mensagem que vai mandar quando der algum erro
      return response
        .status(401)
        .json({ error: 'Seu cpf ou senha estão incorretos' })
    }

    if (!(await schema.isValid(request.body))) { //  este isValid me ajuda a buscar o usuário
      userEmailOrPasswordIncorrect()
    }

    const { cpf, password } = request.body

    const user = await User.findOne({ // esse é para checar se o cpf está correto
      where: { cpf }
    })

    if (!user) {
      userEmailOrPasswordIncorrect()
    }

    if (!(await user.checkPassword(password))) { // este é para checar se a senha descriptografada está correta
      userEmailOrPasswordIncorrect()
    }

    return response.json({ // aqui é apenas o que eu quero que retorne caso a minha senha e o meu cpf estiverem corretos
      id: user.id,
      nome: user.nome,
      cpf: user.cpf,
      admin: user.admin,
      token: jwt.sign({ id: user.id, cpf: user.cpf }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  }
}

export default new SessionController()
