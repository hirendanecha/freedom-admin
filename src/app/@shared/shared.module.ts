import { NgModule } from '@angular/core';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule, CardModule, ButtonModule, GridModule, FormModule, TableModule, BadgeModule, PaginationModule, ModalModule, ToastModule, ProgressModule, NavModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

const sharedComponents = [
  PaginationComponent,
  TableComponent
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
  TabsModule
];

@NgModule({
  declarations: sharedComponents,
  imports: sharedModules,
  exports: [
    ...sharedModules,
    ...sharedComponents
  ]
})
export class SharedModule { }
