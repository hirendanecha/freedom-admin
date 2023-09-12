import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityComponent } from './freedom-page.component';
import { ViewPageDialogComponent } from './view-page/edit-page.component';

const routes: Routes = [
  {
    path: '',
    component: CommunityComponent,
    data: {
      title: 'Freedom Page',
    },
  },
  {
    path: 'edit/:id',
    component: ViewPageDialogComponent,
    data: {
      title: 'edit Page',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreedomPageRoutingModule { }
