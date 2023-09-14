import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/@shared/shared.module';
import { UserComponent } from './user.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { ViewUserPostComponent } from './view-post-list/post-list.component';
import { UnSuspendedUserComponent } from './un-suspended-users/un-suspended-user.component';
import { SuspendedUserComponent } from './suspended-users/suspended-user.component';

@NgModule({
  declarations: [UserComponent, EditUserDialogComponent, ViewUserPostComponent, UnSuspendedUserComponent, SuspendedUserComponent],
  imports: [SharedModule, UserRoutingModule],
  exports: [UnSuspendedUserComponent, SuspendedUserComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class UserModule { }
