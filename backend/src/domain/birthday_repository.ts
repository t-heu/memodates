import {Birthday} from './Birthday'

interface IcreateDTO {
  provider_id: string
  name: string
  date: string
}

export default interface IcreateRepository {
  create(data: IcreateDTO): Promise<Birthday>
  findById(id: string): Promise<true | false>
}