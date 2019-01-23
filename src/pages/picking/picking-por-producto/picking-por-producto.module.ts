import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickingPorProductoPage } from './picking-por-producto';
import { AngularInputMasks } from 'angular-input-masks';
@NgModule({
  declarations: [
    PickingPorProductoPage,
  ],
  imports: [
    IonicPageModule.forChild(PickingPorProductoPage),
    AngularInputMasks
  ],
})
export class PickingPorProductoPageModule {}
