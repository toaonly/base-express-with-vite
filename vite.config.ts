import {
  ConfigEnv,
  UserConfig,
  defineConfig,
  PluginOption,
  loadEnv,
} from 'vite'
import { configDefaults } from './vite/config'
import { resolve } from './vite/utils'
import packageJson from './package.json'

export default defineConfig(({ mode }: ConfigEnv) => {
  const appEnv = loadEnv(mode, process.cwd(), '')
  
  Object.assign(process.env, appEnv)

  const config: UserConfig = {
    appType: 'custom',

    esbuild: {
      target: ['esnext'],
    },

    resolve: {
      alias: configDefaults.resolve.alias,
    },

    plugins: [...configDefaults.plugins] as PluginOption[],

    mode,

    build: {
      outDir: resolve('dist'),
      lib: {
        entry: resolve('src/index.ts'),
        formats: ['es'],
        fileName: (_, entryName) => `${entryName}.js`,
      },
      rollupOptions: {
        external: [/node_modules|http/, ...Object.keys(packageJson.dependencies)]
      },
    },
  }

  return config
})
