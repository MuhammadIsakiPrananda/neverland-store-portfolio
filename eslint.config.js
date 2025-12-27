import js from '@eslint/js'
import globals from 'globals'
import { FlatCompat } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist/'] },
  js.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
  ...new FlatCompat({
    baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
  }).config({
    extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime'],
  }),
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
      'react/prop-types': 'off', // Menonaktifkan jika Anda tidak menggunakan PropTypes
    },
  },
]
