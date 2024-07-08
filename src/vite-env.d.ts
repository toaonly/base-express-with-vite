/// <reference types="vite/client" />

type EnumValues<T> = T[keyof T]

type Dictionary = {
  [key: string]: any
}
