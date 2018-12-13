import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RutaPickingPage } from './ruta-picking';

@NgModule({
  declarations: [
    RutaPickingPage,
  ],
  imports: [
    IonicPageModule.forChild(RutaPickingPage),
  ],
})
export class RutaPickingPageModule {}
