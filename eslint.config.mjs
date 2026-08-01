const sharedRules = {
  curly: ['error', 'all'],
  eqeqeq: ['error', 'always'],
  'no-undef': 'error',
  'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  'no-var': 'error',
  'prefer-const': 'error',
};

export default [
  {
    ignores: ['node_modules/**', 'miniprogram_npm/**', 'coverage/**', 'dist/**'],
  },
  {
    files: ['miniprogram/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        App: 'readonly',
        Component: 'readonly',
        Page: 'readonly',
        getApp: 'readonly',
        wx: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    rules: sharedRules,
  },
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        module: 'readonly',
        require: 'readonly',
      },
    },
    rules: sharedRules,
  },
  {
    files: ['preview/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        document: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
      },
    },
    rules: sharedRules,
  },
  {
    files: ['scripts/**/*.mjs', 'eslint.config.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        Buffer: 'readonly',
        URL: 'readonly',
        console: 'readonly',
        process: 'readonly',
      },
    },
    rules: sharedRules,
  },
];
