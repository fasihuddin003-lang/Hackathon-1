import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'course-details',
    {
      type: 'category',
      label: 'Modules',
      items: [
        'modules/module1-ros2',
        'modules/module2-gazebo-unity',
        'modules/module3-nvidia-isaac',
        'modules/module4-vla',
      ],
    },
    {
      type: 'category',
      label: 'Weekly Breakdown',
      items: [
        'weekly-breakdown/week1-2-intro',
        'weekly-breakdown/week3-5-ros2',
        'weekly-breakdown/week6-7-gazebo',
        'weekly-breakdown/week8-10-isaac',
        'weekly-breakdown/week11-12-humanoid',
        'weekly-breakdown/week13-conversational',
      ],
    },
    'assessments',
    'hardware-requirements',
  ],
};

export default sidebars;
