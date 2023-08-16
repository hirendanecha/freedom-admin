import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
import { ApproveCommunityComponent } from './approve-community/approve-community.component';
import { UnApproveCommunityComponent } from './un-approve-community/un-approve-community.component';
import { ViewCommunityDialogComponent } from './view-community/edit-community.component';
import { SharedModule } from 'src/app/@shared/shared.module';
@NgModule({
  declarations: [
    CommunityComponent,
    ApproveCommunityComponent,
    UnApproveCommunityComponent,
    ViewCommunityDialogComponent,
  ],
  imports: [
    SharedModule,
    CommunityRoutingModule,
  ],
  exports: [ApproveCommunityComponent, UnApproveCommunityComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CommunityModule {}
