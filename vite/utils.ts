import { exec } from 'child_process'
import path from 'path'

export const isMode =
  <T extends string>(mode: T) =>
  (value: string): value is T =>
    mode === value
export const isProd = isMode('production')
export const isStg = isMode('staging')
export const promiseExec = (
  command: string,
  options?: Parameters<typeof exec>[1]
) =>
  new Promise((resolve, reject) => {
    exec(command, options, (err, stdout) => {
      if (err) reject(err)
      else resolve(stdout)
    })
  })
export const wait = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
export const resolve = (...args: string[]) =>
  path.resolve(process?.cwd() || __dirname, ...args)
