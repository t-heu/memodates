import {injectable, inject} from 'tsyringe'

import IUserRepository from '../../../domain/user_repository'

interface RequestDTO {
  id: string
}

@injectable()
export default class UserProfileService {
  constructor(@inject('UserRepository') private createRepository: IUserRepository) {}

  public async execute({ id }: RequestDTO) {
    const user = await this.createRepository.findById(id)
    
    return user
  }
}