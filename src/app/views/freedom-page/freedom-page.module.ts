import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommunityComponent } from './freedom-page.component';
import { ApprovePageComponent } from './approve-page/approve-page.component';
import { UnApprovePageComponent } from './un-approve-page/un-approve-page.component';
import { ViewPageDialogComponent } from './view-page/edit-page.component';
import { FreedomPageRoutingModule } from './freedom-page-routing.module';
import { SharedModule } from 'src/app/@shared/shared.module';
@NgModule({
  declarations: [
    CommunityComponent,
    ApprovePageComponent,
    UnApprovePageComponent,
    ViewPageDialogComponent,
  ],
  imports: [
    SharedModule,
    FreedomPageRoutingModule,
  ],
  exports: [ApprovePageComponent, UnApprovePageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FreedomPageModule { }
