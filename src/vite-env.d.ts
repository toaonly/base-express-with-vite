/// <reference types="vite/client" />

type Dictionary = {
  [key: string]: any
}

namespace Express {
  interface Request {
    files: {
      [fieldname: string]: Buffer
    }
  }
}
