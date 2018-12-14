import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallePorProductoPage } from './detalle-por-producto';

@NgModule({
  declarations: [
    DetallePorProductoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallePorProductoPage),
  ],
})
export class DetallePorProductoPageModule {}
