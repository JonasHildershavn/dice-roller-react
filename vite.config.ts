import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import dts from 'vite-plugin-dts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'library') {
    // Library build configuration
    return {
      plugins: [
        react(),
        dts({
          insertTypesEntry: true,
          include: ['src/lib/**/*'],
        })
      ],
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/lib/index.ts'),
          name: 'DiceRollerReact',
          formats: ['es', 'umd'],
          fileName: (format) => `dice-roller-react.${format}.js`
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'three', 'cannon-es'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              three: 'THREE',
              'cannon-es': 'CANNON'
            }
          }
        },
        sourcemap: true,
        minify: false
      }
    }
  }
  
  // Demo app configuration
  return {
    plugins: [react()],
    build: {
      outDir: 'dist-demo'
    }
  }
})
