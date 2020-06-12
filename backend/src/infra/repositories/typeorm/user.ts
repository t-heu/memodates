import {getRepository, Repository} from 'typeorm'
import { sign } from 'jsonwebtoken'

import * as authConfig from '../../../config/auth'
import {User} from '../../../domain/User'
import IUserRepository from '../../../domain/user_repository'

interface IcreateDTO {
  yourBirthday: string
  email: string
  password: string
  hasPassword: boolean
  hasFacebook: boolean
  name: string
}

interface Iuser extends User {
  acess_token: string
}

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create({yourBirthday, email, password, name, hasFacebook, hasPassword}: IcreateDTO): Promise<User> {
    const user = <Iuser>this.ormRepository.create({
      yourBirthday,
      email,
      password,
      hasFacebook,
      hasPassword,
      name
    })

    user.acess_token = sign({ id: user.id }, authConfig.ACCESS_TOKEN_SECRET, {
      expiresIn: authConfig.EXPIRES_IN,
    })

    await this.ormRepository.save(user);

    return user
  }

  public async findEmail(email: string): Promise<User | false> {
    
    const user = await this.ormRepository.findOne({
      email,
    })

    return user || false
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
      relations: ["birthday"]
    })

    return user
  }

}

export default UserRepository