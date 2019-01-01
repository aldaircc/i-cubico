import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReciboPage_02Page } from './recibo-page-02';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    ReciboPage_02Page,
  ],
  imports: [
    IonicPageModule.forChild(ReciboPage_02Page),
    NgxDatatableModule
  ],
})
export class ReciboPage_02PageModule {}
