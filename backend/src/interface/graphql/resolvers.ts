import { Request } from 'express';
import {container} from 'tsyringe'

import auth from './middlewares/auth';

import CreateUserService from '../../app/user/services/CreateUserService'
import CreateBirthdayService from '../../app/birthday/services/CreateBirthdayService'
import AuthenticateUserService from '../../app/user/services/AuthenticateUserService'
import UserProfileService from '../../app/user/services/UserProfileService'
import OauthService from '../../app/user/services/OauthService'

interface IReq {
  req: Request
}

const resolvers = {
  Query: {
    profile: async (_: any, root: any, { req }: IReq) => {
      const id = auth(req) as string

      const profile = container.resolve(UserProfileService)//new AcessProfileService()
      const res = await profile.execute({id})

      return res
    },
  },
  Mutation: {
    signup: async (_: any, root: any) => {
      const { email, yourBirthday, password, name } = root
      
      const create_user = container.resolve(CreateUserService)//new CreateUserService()
      const res = await create_user.execute({ email, yourBirthday, password, name, hasPassword: true, hasFacebook: false})
      
      return res
    },

    signin: async (_: any, root: any) => {
      const { email, password } = root
      
      const authUser = container.resolve(AuthenticateUserService)//new AuthenticateUserService()
      const res = await authUser.execute({email, password})
      
      return res
    },

    oauth: async (_: any, root: any) => {
      const { access_token, TypeServiceOauth } = root
      
      const oauth = container.resolve(OauthService)//new OauthService()
      const response = await oauth.execute({access_token, TypeServiceOauth})
      
      return response
    },

    createBirthday: async (_: any, root: any, { req }: IReq) => {
      const provider_id = auth(req) as string

      const { name, date, idExist } = root

      const create_birthday = container.resolve(CreateBirthdayService)//new CreateBirthdayService()
      const res = await create_birthday.execute({provider_id, name, date, idExist})
      
      return res
    }
  }
};

export default resolvers
