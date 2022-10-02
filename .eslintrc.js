module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  env: {
    browser: true,
    amd: true,
    node: true
  },
  extends: ['prettier'],
  plugins: ['react', 'prettier', 'unused-imports', 'simple-import-sort'],
  rules: {
    'jsx-a11y/accessible-emoji': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'simple-import-sort/exports': 'error',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
        reservedFirst: true
      }
    ],
    'simple-import-sort/imports': 'warn',
    'unused-imports/no-unused-imports': 'warn',
    'prettier/prettier': ['warn', { endOfLine: 'auto' }, { usePrettierrc: true }],
    'import/first': 'off',
    'no-fallthrough': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'jsx-quotes': 'off',
    'prefer-const': 'off',
    'no-tabs': 'error',
    curly: 'off',
    'react/react-in-jsx-scope': 'off',
    'no-mixed-spaces-and-tabs': 'error'
  }
}
