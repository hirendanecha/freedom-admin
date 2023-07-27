import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ProgressModule,
  ToastModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [RegisterComponent, Page404Component, Page500Component],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ToastModule,
    ProgressModule,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
