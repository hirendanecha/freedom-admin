import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { PostRoutingModule } from './post-routing.module';
import { CommunityComponent } from '../community/community.component';
import { PostsComponent } from './posts.component';
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
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
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
export class PostModule {}
