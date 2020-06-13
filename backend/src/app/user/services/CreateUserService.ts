import {injectable, inject} from 'tsyringe'

import authenticate from '../../../interface/utils/auth'
import IUserRepository from '../../../domain/user_repository'

interface RequestDTO {
  yourBirthday: string
  email: string
  password: string
  hasPassword: boolean
  hasFacebook: boolean
  name: string
}

@injectable()
export default class CreateUserService {
  constructor(@inject('UserRepository') private createRepository: IUserRepository) {}

  public async execute({yourBirthday, email, password, name, hasFacebook, hasPassword}: RequestDTO) {
    
    if(await this.createRepository.findEmail(email)) {
      throw new Error('User exist');
    }
    
    const user = await this.createRepository.create({
      yourBirthday,
      email,
      password,
      hasFacebook,
      hasPassword,
      name
    })
    
    return authenticate(user.id)
    /*return sign({ id: user.id }, authConfig.ACCESS_TOKEN_SECRET, {
      expiresIn: authConfig.EXPIRES_IN,
    })*/
  }
}