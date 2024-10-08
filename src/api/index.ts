import { Router } from 'express'
// import auth from './auth'
// import data from './data'
// import pipelines from './pipelines'

const router = Router()

router.get('/', (_, res) => {
  res.json({ result: true })
})
// router.use('/data', data)
// router.use('/pipelines', pipelines)

export default router
