import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'Bridging the gap between digital brain and physical body',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://your-username.github.io',
  baseUrl: '/physical-ai-textbook/',

  organizationName: 'your-username',
  projectName: 'physical-ai-textbook',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
    localeConfigs: {
      en: { label: 'English' },
      ur: { label: 'اردو', direction: 'rtl' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Textbook',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          to: '/auth',
          label: 'Sign In',
          position: 'right',
        },
        {
          href: 'https://github.com/your-username/physical-ai-textbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Textbook',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
          {
            label: 'Module 1: ROS 2',
            to: '/docs/modules/module1-ros2',
          },
          {
            label: 'Module 2: Gazebo & Unity',
            to: '/docs/modules/module2-gazebo-unity',
          },
          {
            label: 'Module 3: NVIDIA Isaac',
            to: '/docs/modules/module3-nvidia-isaac',
          },
          {
            label: 'Module 4: VLA',
            to: '/docs/modules/module4-vla',
          },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/your-username/physical-ai-textbook',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Panaversity. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
