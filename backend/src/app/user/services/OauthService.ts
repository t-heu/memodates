import axios from 'axios'
import {injectable, inject} from 'tsyringe'

import authenticate from '../../../interface/utils/auth'
import IUserRepository from '../../../domain/user_repository'

interface Iuser {
  password?: string
  hasPassword: boolean
  hasFacebook: boolean
  id: string
  email: string
}

type Tuser = Iuser | false

interface RequestDTO {
  access_token: string
  TypeServiceOauth: ServicesTypes
}

enum ServicesTypes {
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE'
}

interface Ireturn {
  email: string
  id: string
  name: string
  hasFacebook: boolean
}

@injectable()
export default class OauthService {
  service = {
    "FACEBOOK": this.facebookService,
    "GOOGLE": this.googleService
  }

  constructor(@inject('UserRepository') private createRepository: IUserRepository) {}

  public async execute({access_token, TypeServiceOauth}: RequestDTO) {
    try {
      const {email, id, name, hasFacebook} = await this.service[TypeServiceOauth](access_token) as Ireturn

      const usersExist: Tuser = await this.createRepository.findEmail(email)
      
      if (!usersExist) {
        const user: Tuser = await this.createRepository.create({
          email, 
          yourBirthday: '2/3', 
          password: id, 
          name, 
          hasPassword: false, 
          hasFacebook
        })

        return authenticate(user.id)
        /*return sign({ id: user.id }, authConfig.ACCESS_TOKEN_SECRET, {
          expiresIn: authConfig.EXPIRES_IN,
        })*/
      }
    
      /*return sign({ id: usersExist.id }, authConfig.ACCESS_TOKEN_SECRET, {
        expiresIn: authConfig.EXPIRES_IN,
      })*/
      return authenticate(usersExist.id)
    } catch(e) {
      return null
    }
  }

  private async facebookService(access_token: string) {
    try {
      const response = await axios.get(`https://graph.facebook.com/me?fields=birthday,email,name,picture&access_token=${access_token}`)
        
      const { email, id, name } = response.data
      
      return {
        email,
        id,
        name,
        hasFacebook: true
      }
    } catch(e) {
      console.log(e)
      return null
    } 
  }

  async googleService() {
    return null
  }
}