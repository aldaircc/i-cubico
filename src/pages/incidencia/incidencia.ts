import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the IncidenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incidencia',
  templateUrl: 'incidencia.html',
})
export class IncidenciaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncidenciaPage');
  }

  protected adjustTextarea(event: any): void {
    debugger;
    let textarea: any = event.target;
    textarea.rows = textarea.value.split('\n').length;
    return;
  }

  dismiss(){
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
}
