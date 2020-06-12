import {User} from './User'

interface IcreateDTO {
  yourBirthday: string
  email: string
  password: string
  hasPassword: boolean
  hasFacebook: boolean
  name: string
}

export default interface IcreateRepository {
  create(data: IcreateDTO): Promise<User>
  findEmail(email: string): Promise<User | false>
  findById(id: string): Promise<User | undefined>
}