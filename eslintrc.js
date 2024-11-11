module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // "prettier/prettier": ["error", { endOfLine: "auto" }],
    'prettier/prettier': 'off',
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'no-unsafe-optional-chaining': 'off',
    'react/no-array-index-key': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-no-bind': 'off',
    'no-return-assign': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
    'no-inner-declarations': 'off',
    'react/button-has-type': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/jsx-no-script-url': 'off',
    'no-script-url': 'off',
    'for-direction': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'consistent-return': 'off',
    'array-callback-return': 'off',
    radix: 'off',
    'no-nested-ternary': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'prefer-const': 'off',
    ' react/function-component-definition': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-else-return': 'off',
    'no-extra-boolean-cast': 'off',
    'no-useless-escape': 'off'
  }
}
