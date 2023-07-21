module.exports = {
  extends: ["plugin:@next/next/recommended", "prettier"],
  plugins: ["react", "react-hooks", "simple-import-sort", "prettier"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  env: {
    es6: true,
  },
  rules: {
    "import/extensions": "off", // No file extensions in imports
    "prettier/prettier": "warn", // Apply Prettier rules
    "react/react-in-jsx-scope": "off", // import React from 'react' is not required in Next.js
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "simple-import-sort/imports": "error", // Properly sorted imports
  },
};
