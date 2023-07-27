import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {
  BadgeModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  PaginationModule,
  ProgressModule,
  TableModule,
  ToastModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { UserComponent } from './user.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { DeleteDialogComponent } from './delete-confirmation-dialog/delete-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserComponent, EditUserDialogComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    TableModule,
    BadgeModule,
    PaginationModule,
    ModalModule,
    FormsModule,
    ToastModule,
    ProgressModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class UserModule {}
