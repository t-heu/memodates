import {injectable, inject} from 'tsyringe'

import IBirthdayRepository from '../../../domain/birthday_repository'

interface RequestDTO {
  provider_id: string
  name: string
  date: string
  idExist: string
}

@injectable()
export default class createBirthdayService {
  constructor(@inject('BirthdayRepository') private createRepository: IBirthdayRepository) {}

  public async execute({provider_id, name, date, idExist}: RequestDTO) {  
    const verif = await this.createRepository.findById(idExist)
 
    if(verif) {
      return null
    }

    const birthday = await this.createRepository.create({provider_id, name, date})

    return birthday
  }
}