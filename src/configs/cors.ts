import type { NextFunction, Request, Response } from 'express'

const {
  VITE_APP_ALLOW_ORIGIN,
  VITE_APP_ALLOW_METHODS,
  VITE_APP_ALLOW_HEADERS,
} = import.meta.env

const cors = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', VITE_APP_ALLOW_ORIGIN)
  res.header('Access-Control-Allow-Methods', VITE_APP_ALLOW_METHODS)
  res.header('Access-Control-Allow-Headers', VITE_APP_ALLOW_HEADERS)

  if (req.method === 'OPTIONS') return res.status(204).end()

  next()
}

export default cors
