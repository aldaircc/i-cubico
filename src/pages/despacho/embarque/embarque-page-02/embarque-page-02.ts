import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, App } from 'ionic-angular';
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

  vParameter :any;
  totalSubBultos: number = 0;
  totalSubBultosLeido: number = 0;

  constructor(public app: App, public popoverCtrl: PopoverController, public modalCtrl:ModalController, public navCtrl: NavController, public navParams: NavParams, public sGlobal: GlobalServiceProvider,
    public sDesp: DespachoServiceProvider) {
    this.vParameter = this.navParams.get('vParameter');
    this.listarSubBultosLeidos(this.vParameter.Id_Tra, 2);
  }

presentPopover(myEvent){
    let popover = this.popoverCtrl.create(PopoverReciboComponent, {'page' : 1});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData =>{
      if(popoverData == 4){
        this.navCtrl.pop();
        var nav = this.app.getRootNav();
        nav.setRoot(HomePage);
      }
    });
  }

  listarSubBultosLeidos(strTransaccion, tipo){
    this.sDesp.listarSubBultosLeidos(strTransaccion, tipo).then(result=>{
      debugger;
      let res: any = result;

      this.totalSubBultos = res.length;
      this.totalSubBultosLeido = res.reduce((acc, cur) => (cur.FlagLeido == true) ? ++acc : acc, 0);
    /**
      var lista = method.ListarSubBultosLeidos(tx, 2);
      totSubBultos = lista.Count();
      totSubBultosLeido = lista.Where(x => x.FlagLeido == true).Count(); 
    **/
    });
  }

  goToEmbarPage03(obj):void{
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

  closeEmbarPage03(): void{
    this.navCtrl.pop();
  }
}
