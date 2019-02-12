import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultarEanPage } from './consultar-ean';

@NgModule({
  declarations: [
    ConsultarEanPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultarEanPage),
  ],
})
export class ConsultarEanPageModule {}
