import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommunityComponent } from './freedom-page.component';
import { ViewPageDialogComponent } from './view-page/edit-page.component';
import { FreedomPageRoutingModule } from './freedom-page-routing.module';
import { SharedModule } from 'src/app/@shared/shared.module';
@NgModule({
  declarations: [
    CommunityComponent,
    ViewPageDialogComponent,
  ],
  imports: [
    SharedModule,
    FreedomPageRoutingModule,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FreedomPageModule { }
