// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'src/types/database.ts',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@/features/*/*'],
        },
      ],
      'import/no-cycle': 'error',
    },
  },
  {
    files: [
      'src/features/**/*.{ts,tsx}',
      'src/types/**/*.ts',
      'src/supabase/**/*.ts',
    ],
    rules: {
      'import/no-cycle': 'off',
    },
  },
  ...storybook.configs['flat/recommended'],
];

export default eslintConfig;
