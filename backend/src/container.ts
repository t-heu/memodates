import {container} from 'tsyringe'

import IUserRepository from './domain/user_repository'
import UserRepository from './infra/repositories/typeorm/user'

import IBirthdayRepository from './domain/birthday_repository'
import BirthdayRepository from './infra/repositories/typeorm/birthday'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IBirthdayRepository>('BirthdayRepository', BirthdayRepository)