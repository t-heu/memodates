import {injectable, inject} from 'tsyringe'

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
    
    const user = await this.createRepository.create({
      yourBirthday,
      email,
      password,
      hasFacebook,
      hasPassword,
      name
    })
    
    return user
  }
}