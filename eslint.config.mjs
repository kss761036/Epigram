import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
      },
    },
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    rules: {
      'prettier/prettier': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-warning-comments': [
        'error',
        {
          terms: [
            '✨',
            '✅',
            '🔧',
            '🚀',
            '💡',
            '❗',
            '🔍',
            '🔥',
            '⭕',
            '🔵',
            '⚪',
            '🟢',
            '🔴',
            '🟡',
            '🟠',
            '📝',
            '🚧',
            '⚙️',
            '💾',
            '📌',
            '📍',
            '🔗',
          ],
          location: 'anywhere',
        },
      ],
    },
  },
];

export default eslintConfig;
