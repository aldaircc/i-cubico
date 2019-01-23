import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultarUbicacionPage } from './consultar-ubicacion';

@NgModule({
  declarations: [
    ConsultarUbicacionPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultarUbicacionPage),
  ],
})
export class ConsultarUbicacionPageModule {}
