import {injectable, inject} from 'tsyringe'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'

import * as authConfig from '../../../config/auth'
import IUserRepository from '../../../domain/user_repository'

interface RequestDTO {
  email: string
  password?: string
}

interface Iuser {
  password: string
  hasPassword: boolean
  hasFacebook: boolean
  id: string
  email: string
}

type Tuser = Iuser | false

@injectable()
export default class AuthenticateUserService {
  constructor(@inject('UserRepository') private createRepository: IUserRepository) {}

  public async execute({email, password}: RequestDTO) {
    const user: Tuser = await this.createRepository.findEmail(email)
    
    if (!user) throw new Error('User not Found');

    if(!user.hasPassword) {
      throw new Error('connected with service FACEBOOK or others')
    }

    if(password){
      if (!await compare(password, user.password)) {
        throw new Error('invalid password')
      }
    }
    
    return sign({ id: user.id }, authConfig.ACCESS_TOKEN_SECRET, {
      expiresIn: authConfig.EXPIRES_IN,
    })
  }
}
