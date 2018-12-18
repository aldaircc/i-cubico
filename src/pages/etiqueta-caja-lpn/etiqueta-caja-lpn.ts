import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import moment from 'moment';

/**
 * Generated class for the EtiquetaCajaLpnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etiqueta-caja-lpn',
  templateUrl: 'etiqueta-caja-lpn.html',
})
export class EtiquetaCajaLpnPage {

  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

  selectOptions : any;
  vEtq : any;
  fecEmi : any;
  fecVen : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.selectOptions = {
      title: 'Pizza Toppings',
      subTitle: 'Select your toppings',
      mode: 'md'
    };

      this.vEtq = navParams.get('vEtq');
    console.log('Parametro recibido', this.vEtq);
    debugger;
    this.fecEmi = moment(this.vEtq.FecEmi).toISOString();// .format('YYYY-MM-DD');
    this.fecVen = moment(this.vEtq.FecVen).format('YYYY-MM-DD');
    console.log('FecEmi', this.fecEmi);
    console.log('FecVen', this.fecVen);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EtiquetaCajaLpnPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
