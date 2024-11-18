import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: {
        ...globals.browser, // ব্রাউজারের গ্লোবাল ভেরিয়েবল
        ...globals.node, // Node.js গ্লোবাল ভেরিয়েবল যোগ করা
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['node_modules', 'dist'], // ইগনোর করা ফোল্ডার
    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
  },
];
