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
    "import/extensions": "off",
    "prettier/prettier": "warn",
    "react/react-in-jsx-scope": "off",
    "simple-import-sort/imports": "error",
    "max-len": ["error", { code: 120 }],
  },
};
