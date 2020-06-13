import { sign } from 'jsonwebtoken'

import * as authConfig from '../../config/auth'

export default (id: string) => {
  return sign({ id }, authConfig.ACCESS_TOKEN_SECRET, {
    expiresIn: authConfig.EXPIRES_IN,
  })
}
