import {
  ConfigEnv,
  UserConfig,
  defineConfig,
  PluginOption,
  loadEnv,
  createViteRuntime,
} from 'vite'
import { configDefaults } from './vite/config'
import { resolve } from './vite/utils'

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  const config: UserConfig = {
    appType: 'custom',

    esbuild: {
      target: ['node20', 'esnext'],
    },

    optimizeDeps: {
      entries: [resolve('src/index.ts')],
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
        external: [/node_modules/, 'fs'],
      },
    },
  }

  return config
})
