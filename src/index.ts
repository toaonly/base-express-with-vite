import express from 'express'
import api from './api'
import { cors } from './configs'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(cors)

app.use('/api', api)

app.listen(process.env.PORT).on('listening', () => {
  console.debug(
    `Listening on port ${process.env.PORT} mode ${import.meta.env.MODE}`
  )
})
