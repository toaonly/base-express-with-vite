import { Router } from 'express'
// import multer from 'multer'

// const upload = multer({ dest: 'uploads/' })
// import auth from './auth'
// import data from './data'
// import pipelines from './pipelines'

const router = Router()

// router.use('/auth', auth)
// router.use('/data', data)
// router.use('/pipelines', pipelines)

router.post('/upload', (req, res) => {
  // const { file, name } = req.body

  console.log(req.body)
  console.log(req.files)
  // console.log(req.headers['content-type'])

  res.status(201).json({
    result: true,
  })
})

export default router
