import { Component } from '@angular/core';
import { IonicPage, Platform, ViewController, NavController, NavParams, ModalController, PopoverController, App } from 'ionic-angular';
import { GlobalServiceProvider } from '../../../../providers/global-service/global-service';
import { DespachoServiceProvider } from '../../../../providers/despacho-service/despacho-service';
import { EmbarquePage_03Page } from '../embarque-page-03/embarque-page-03';
import { PopoverReciboComponent } from '../../../../components/popover-recibo/popover-recibo';
import { HomePage } from '../../../home/home';
/**
 * Generated class for the EmbarquePage_02Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-embarque-page-02',
  templateUrl: 'embarque-page-02.html',
})
export class EmbarquePage_02Page {

  vParameter: any;
  totalSubBultos: number = 0;
  totalSubBultosLeido: number = 0;
  valorpopoverGlobal02: boolean = false
  popoverGlobal: any;

  constructor(public app: App, public popoverCtrl: PopoverController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public sGlobal: GlobalServiceProvider,
    public sDesp: DespachoServiceProvider, public viewCtrl: ViewController, private platform: Platform) {
    this.vParameter = this.navParams.get('vParameter');
    this.listarSubBultosLeidos(this.vParameter.Id_Tra, 2);
  }

  presentPopover(myEvent) {
    debugger;
    this.valorpopoverGlobal02 = true;
    this.popoverGlobal = this.popoverCtrl.create(PopoverReciboComponent, { 'page': 1 });
    this.popoverGlobal.present({
      ev: myEvent
    });

    this.popoverGlobal.onDidDismiss(popoverData => {
      this.valorpopoverGlobal02 = false;
      if (popoverData == 4) {
        this.navCtrl.pop();
        var nav = this.app.getRootNav();
        nav.setRoot(HomePage);
      }
    });
  }

  listarSubBultosLeidos(strTransaccion, tipo) {
    this.sDesp.listarSubBultosLeidos(strTransaccion, tipo).then(result => {
      let res: any = result;
      this.totalSubBultos = res.length;
      this.totalSubBultosLeido = res.reduce((acc, cur) => (cur.FlagLeido == true) ? ++acc : acc, 0);
    });
  }

  goToEmbarPage03(obj): void {
    let parameter = {
      'Id_Tra': obj.Id_Tra,
      'Id_Conductor': obj.Id_Conductor,
      'Conductor': obj.Conductor,
      'Documento': obj.Documento,
      'Id_Vehiculo': obj.Id_Vehiculo,
      'Placa': obj.Placa,
      'totalSubBultos': this.totalSubBultos,
      'totSubBultosLeido': this.totalSubBultosLeido
    };
    this.navCtrl.push(EmbarquePage_03Page, { 'vParameter': parameter });
  }

  closeEmbarPage03(): void {
    this.navCtrl.pop();
  }

  ionViewDidLoad(){
  }

  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {
      debugger;
      if(this.valorpopoverGlobal02){
        this.valorpopoverGlobal02 = false;
        this.popoverGlobal.dismiss();
      }
      else{
        this.navCtrl.pop(); 
      }      
  });

  }
}
