module.exports = {
  "env": {
      "browser": true,
      "node": true,
      "es6": true,
      "jest/globals": true
  },
  "extends": [ 
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2020,
      "sourceType": "module"
  },
  "plugins": [
      "react",
      "react-hooks",
      "jest"
  ],
  "rules": {
      "indent": [
          "error",
          2
      ],
      "linebreak-style": [
          "error",
          "windows"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "never"
      ],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
          "error", "always"
      ],
      "arrow-spacing": [
          "error", { "before": true, "after": true }
      ],
      "no-unused-vars": [
          "error",
          {
              "ignoreRestSiblings": true
          }
      ],
      "no-console": 0,
      "react/prop-types": 0,
      "react/react-in-jsx-scope": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}