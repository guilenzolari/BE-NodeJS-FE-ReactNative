import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'], // Ignorar pastas comuns de build e dependências
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node, // Ambiente Node.js
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    extends: [
      js.configs.recommended, // Regras recomendadas do ESLint
      prettier, // Desativa conflitos com o Prettier
    ],
    rules: {
      'prettier/prettier': 'error', // Mostra erro se o código não estiver formatado
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
]);
