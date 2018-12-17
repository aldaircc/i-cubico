import { NgModule } from '@angular/core';
import { IonicPageModule, NavController } from 'ionic-angular';
import { RutaPickingPage } from './ruta-picking';
import { PickingPage } from '../picking';


@NgModule({
  declarations: [
    RutaPickingPage,
  ],
  imports: [
    IonicPageModule.forChild(RutaPickingPage),
  ],
})
export class RutaPickingPageModule {

  

}
