import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickingPorProductoPage } from './picking-por-producto';

@NgModule({
  declarations: [
    PickingPorProductoPage,
  ],
  imports: [
    IonicPageModule.forChild(PickingPorProductoPage),
  ],
})
export class PickingPorProductoPageModule {}
