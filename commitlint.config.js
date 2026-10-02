export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)(?:\(([^)]+)\))?!?:(?:\s*)(.+)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        'header-no-uppercase': (parsed) => {
          const { raw } = parsed;
          const header = (raw || '').split(/\r?\n/)[0];
          if (/[A-Z]/.test(header)) {
            return [false, 'header must contain only lowercase letters'];
          }
          return [true];
        },
        'no-trailing-period': (parsed) => {
          const { raw } = parsed;
          const lines = (raw || '').split(/\r?\n/).filter((l) => l.trim().length > 0);
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().endsWith('.')) {
              return [false, `line ${i + 1} must not end with a full stop (.)`];
            }
          }
          return [true];
        },
        'colon-space-check': (parsed) => {
          const { raw } = parsed;
          const header = (raw || '').split(/\r?\n/)[0];
          if (header.includes(':')) {
            const match = header.match(/:(\s*)/);
            if (!match || match[1] !== ' ') {
              return [false, 'use one space after a colon (:)'];
            }
          }
          return [true];
        },
        'body-footer-lowercase': (parsed) => {
          const { raw } = parsed;
          const lines = (raw || '').split(/\r?\n/).slice(1).filter((l) => l.trim().length > 0);
          for (let i = 0; i < lines.length; i++) {
            if (/[A-Z]/.test(lines[i])) {
              return [false, `body/footer line ${i + 1} must contain only lowercase letters`];
            }
          }
          return [true];
        },
      },
    },
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 50],
    'body-max-line-length': [2, 'always', 72],
    'footer-max-line-length': [2, 'always', 72],
    'subject-full-stop': [0],
    'subject-case': [0],
    'header-no-uppercase': [2, 'always'],
    'no-trailing-period': [2, 'always'],
    'body-footer-lowercase': [2, 'always'],
    'colon-space-check': [1, 'always'],
  },
};
