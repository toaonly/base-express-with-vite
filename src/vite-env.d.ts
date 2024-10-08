/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_PORT: number
  VITE_APP_MODE: 'DEV' | 'STAGE' | 'PROD'
}

type EnumValues<T> = T[keyof T]

type Dictionary = {
  [key: string]: any
}
