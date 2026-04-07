import * as path from 'path';
import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  base:'/MissGwen/',
  title: 'Miss Gwen',
  description: 'A personal tech blog by Miss Gwen, featuring practical notes on Rust, frontend engineering, and architecture.',
  icon: '/rspress-icon.png',
  logoText: 'おかえりなさい',
  logo: '/rspress-logo.png',
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/MissGwen' },
    ],
  },
});
