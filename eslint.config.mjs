import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@tanstack/eslint-plugin-query/recommended"
  ),
  {
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/no-explicit-any": "off",
      // "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-empty-interface": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" }
      ],

      // React specific rules
      "react/jsx-curly-brace-presence": ["warn", { "props": "never", "children": "never" }],
      "react/self-closing-comp": "warn",
      // "react/jsx-sort-props": ["warn", {
      //   "callbacksLast": true,
      //   "shorthandFirst": true,
      //   "ignoreCase": true
      // }],

      // General rules
      // "no-console": ["warn", { "allow": ["warn", "error"] }],
      "prefer-const": "warn",
      "no-duplicate-imports": "error",
      "no-unused-expressions": "warn",
      "no-unused-vars": "off", // Using TypeScript's no-unused-vars instead
      
      // Import rules
      // "import/order": ["warn", {
      //   "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
      //   "newlines-between": "always",
      //   "alphabetize": { "order": "asc" }
      // }],
    },
  },
];

export default eslintConfig;
