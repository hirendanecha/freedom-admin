import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommunityPostComponent } from './community-posts.component';
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ProgressModule,
  TableModule,
  ToastModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommunityPostRoutingModule } from './community-post-routing.module';
@NgModule({
  declarations: [CommunityPostComponent],
  imports: [
    CommonModule,
    CommunityPostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ToastModule,
    ProgressModule,
    TableModule,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CommunityPostModule {}
