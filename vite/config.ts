import { resolve } from './utils'
import type { Alias, PluginOption } from 'vite'

export const configDefaults = {
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve('src'),
      },
    ] as Alias[],
  },

  plugins: [] as PluginOption[],
}
