import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'Utils',
      formats: ['es', 'umd'],
      fileName: (format) => `utils.${format}.js`
    }
  }
})
