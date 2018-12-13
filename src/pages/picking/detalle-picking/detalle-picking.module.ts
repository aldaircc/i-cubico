import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallePickingPage } from './detalle-picking';

@NgModule({
  declarations: [
    DetallePickingPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallePickingPage),
  ],
})
export class DetallePickingPageModule {}
