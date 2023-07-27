import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
import { ApproveCommunityComponent } from './approve-community/approve-community.component';
import { UnApproveCommunityComponent } from './un-approve-community/un-approve-community.component';
import { ViewCommunityDialogComponent } from './view-community/view-community-dialog.component';
import {
  AvatarModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  NavModule,
  PaginationModule,
  ProgressModule,
  TableModule,
  TabsModule,
  ToastModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    CommunityComponent,
    ApproveCommunityComponent,
    UnApproveCommunityComponent,
    ViewCommunityDialogComponent,
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ToastModule,
    ProgressModule,
    NavModule,
    TabsModule,
    TableModule,
    BadgeModule,
    AvatarModule,
    PaginationModule,
    ModalModule,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CommunityModule {}
