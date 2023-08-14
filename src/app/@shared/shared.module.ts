import { NgModule } from '@angular/core';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule, ButtonModule, GridModule, FormModule, TableModule, BadgeModule, PaginationModule, ModalModule, ToastModule, ProgressModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

const sharedComponents = [
  PaginationComponent
];

const sharedModules = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  IconModule,
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
