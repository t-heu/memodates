import { Router } from 'express'

const routes = Router()

routes.get('/v2/notiSend', (req, res) => {
  return res.status(200).send('hahah')
});

export default routes