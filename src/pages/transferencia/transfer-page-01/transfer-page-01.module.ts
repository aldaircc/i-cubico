import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferPage_01Page } from './transfer-page-01';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MomentjsPipe } from '../../../pipes/momentjs/momentjs';

@NgModule({
  declarations: [
    TransferPage_01Page,
  ],
  imports: [
    IonicPageModule.forChild(TransferPage_01Page),
    NgxDatatableModule,
    MomentjsPipe
  ],
})
export class TransferPage_01PageModule {}