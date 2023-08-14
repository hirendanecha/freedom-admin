import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityPostComponent } from './community-posts.component';

const routes: Routes = [
  {
    path: '',
    component: CommunityPostComponent,
    data: {
      title: 'Community Post Page',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityPostRoutingModule {}
