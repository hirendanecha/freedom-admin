import { NgModule } from '@angular/core';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';
import { CommonModule, NgSwitch } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AvatarModule,
  CardModule,
  ButtonModule,
  GridModule,
  FormModule,
  TableModule,
  BadgeModule,
  PaginationModule,
  ModalModule,
  ToastModule,
  ProgressModule,
  NavModule,
  TabsModule,
  BreadcrumbModule,
  FooterModule,
  DropdownModule,
  HeaderModule,
  SidebarModule,
  UtilitiesModule,
  ButtonGroupModule,
  ListGroupModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { DeleteDialogComponent } from '../views/users/delete-confirmation-dialog/delete-dialog.component';
import { ToastComponent } from '../views/toaster/toast.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FilterComponent } from './components/filter/filter.component';
import { EditCommunityComponent } from './components/edit-community/edit-community.component';

const sharedComponents = [
  PaginationComponent,
  TableComponent,
  DeleteDialogComponent,
  ToastComponent,
  FilterComponent,
  EditCommunityComponent
];

const sharedModules = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  IconModule,
  AvatarModule,
  CardModule,
  ButtonModule,
  GridModule,
  FormModule,
  TableModule,
  BadgeModule,
  PaginationModule,
  ModalModule,
  ToastModule,
  ProgressModule,
  NavModule,
  TabsModule,
  BreadcrumbModule,
  FooterModule,
  DropdownModule,
  HeaderModule,
  SidebarModule,
  IconModule,
  UtilitiesModule,
  ButtonGroupModule,
  ListGroupModule,
  NgMultiSelectDropDownModule,
  NgbDatepickerModule,
  NgxSpinnerModule,
];

@NgModule({
  declarations: sharedComponents,
  imports: sharedModules,
  exports: [...sharedModules, ...sharedComponents],
})
export class SharedModule { }
