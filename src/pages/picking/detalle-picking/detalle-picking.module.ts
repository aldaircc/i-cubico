import { NgModule, Component } from '@angular/core';
import { IonicPageModule, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetallePickingPage } from './detalle-picking';

@NgModule({
  declarations: [
    DetallePickingPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallePickingPage),
  ],
})



export class DetallePickingPageModule {
constructor(public navCtrl: NavController, public navParams: NavParams){

}



}
