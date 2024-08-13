import bodyParser from 'body-parser'
import express from 'express'
import api from './api'
import { cors, multipart } from './middlewares'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors)
app.use(multipart)

app.use('/api', api)

app.listen(process.env.PORT).on('listening', () => {
  console.debug(
    `Listening on port ${process.env.PORT} mode ${import.meta.env.MODE}`
  )
})
