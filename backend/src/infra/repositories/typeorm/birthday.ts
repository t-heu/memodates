import {getRepository, Repository} from 'typeorm'

import {Birthday} from '../../../domain/Birthday'
import IBirthdayRepository from '../../../domain/birthday_repository'

interface IcreateDTO {
  provider_id: string
  name: string
  date: string
}

class BirthdayRepository implements IBirthdayRepository {
  private ormRepository: Repository<Birthday>

  constructor() {
    this.ormRepository = getRepository(Birthday)
  }

  public async create({provider_id, name, date}: IcreateDTO): Promise<Birthday> {
    const birthday = this.ormRepository.create({
      provider_id,
      name,
      date
    })

    await this.ormRepository.save(birthday);

    return birthday
  }

  public async findById(idExist: string): Promise<true | false> {
    const birthday = await this.ormRepository.findOne({id: Number(idExist)})

    if(birthday) {
      return true
    }

    return false
  }

}

export default BirthdayRepository