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
    name: 'Post List',
    url: '/post-list',
    iconComponent: { name: 'cil-basket' },
  },
  // {
  //   name: 'Community Post List',
  //   url: '/community-post',
  //   iconComponent: { name: 'cil-library' },
  // },
  {
    name: 'Users',
    url: '/user',
    iconComponent: { name: 'cil-user' },
  },
];
