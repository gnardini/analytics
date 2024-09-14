import type { Config } from 'tailwindcss';

export default {
  content: ['./{pages,layouts,frontend,src}/**/*.{html,js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary-background': 'rgb(var(--primary-background))',
        'secondary-background': 'rgb(var(--secondary-background))',
        'tertiary-background': 'rgb(var(--tertiary-background))',

        'primary-accent': 'rgb(var(--primary-accent))',
        'secondary-accent': 'rgb(var(--secondary-accent))',

        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        error: 'rgb(var(--error))',
        success: 'rgb(var(--success))',
      },
    },
  },
  plugins: [],
} satisfies Config;
