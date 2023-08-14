import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/@shared/shared.module'
import { UserComponent } from './user.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { DeleteDialogComponent } from './delete-confirmation-dialog/delete-dialog.component';

@NgModule({
  declarations: [UserComponent, EditUserDialogComponent, DeleteDialogComponent],
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class UserModule {}
