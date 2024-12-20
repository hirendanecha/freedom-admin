import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    // badge: {
    //   color: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'News Feed',
    url: '/newsfeed',
    iconComponent: { name: 'cil-notes' },
  },
  {
    name: 'Community',
    url: '/community',
    iconComponent: { name: 'cil-bookmark' },
  },
  {
    name: 'Freedom Page',
    url: '/pages',
    iconComponent: { name: 'cil-layers' },
  },
  {
    name: 'Research',
    url: '/research',
    iconComponent: { name: 'cil-control' },
  },
  // {
  //   name: 'Community Post List',
  //   url: '/community-post',
  //   iconComponent: { name: 'cil-library' },
  // },
  {
    name: 'Search End User',
    url: '/user',
    iconComponent: { name: 'cil-user' },
  },
  {
    name: 'Marketing page',
    url: '/marketing',
    iconComponent: { name: 'cil-https' },
  },
  {
    name: 'FT Channels',
    url: '/channels',
    iconComponent: { name: 'cil-screen-desktop' },
  },
  {
    name: 'Support ticket page',
    url: '/report-bugs',
    iconComponent: { name: 'cil-list' },
  },
  {
    name: 'Advertisement page',
    url: '/advertisements',
    iconComponent: { name: 'cil-playlist-add' },
  },
];
