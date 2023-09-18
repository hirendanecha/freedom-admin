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
  ListGroupModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { DeleteDialogComponent } from '../views/users/delete-confirmation-dialog/delete-dialog.component';
import { ToastComponent } from '../views/toaster/toast.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { PageCardComponent } from './components/page-card/page-card.component';
import { NgxSpinnerModule } from 'ngx-spinner';

const sharedComponents = [
  PaginationComponent,
  TableComponent,
  DeleteDialogComponent,
  ToastComponent,
  PageCardComponent
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
  NgxSpinnerModule
];

@NgModule({
  declarations: sharedComponents,
  imports: sharedModules,
  exports: [...sharedModules, ...sharedComponents],
})
export class SharedModule { }
