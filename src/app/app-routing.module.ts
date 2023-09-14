import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { LayoutComponent } from './containers/default-layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      // {
      //   path: 'pages',
      //   loadChildren: () =>
      //     import('./views/pages/pages.module').then((m) => m.PagesModule),
      // },
      {
        path: 'post-list',
        loadChildren: () =>
          import('./views/posts/post.module').then((m) => m.PostModule),
      },
      // {
      //   path: 'community-post',
      //   loadChildren: () =>
      //     import('./views/community-post/community-post.module').then((m) => m.CommunityPostModule),
      // },
      {
        path: 'community',
        loadChildren: () =>
          import('./views/community/community.module').then(
            (m) => m.CommunityModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./views/users/user.module').then((m) => m.UserModule),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/freedom-page/freedom-page.module').then((m) => m.FreedomPageModule),
      },
    ],
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
