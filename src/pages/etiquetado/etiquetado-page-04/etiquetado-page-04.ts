import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlmacenajeServiceProvider } from '../../../providers/almacenaje-service/almacenaje-service';
import { GlobalServiceProvider } from '../../../providers/global-service/global-service';

/**
 * Generated class for the EtiquetadoPage_04Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-etiquetado-page-04',
  templateUrl: 'etiquetado-page-04.html',
})
export class EtiquetadoPage_04Page {

  rowCount: number = 0;
  fila: string = "";
  columna: string = "";
  nivel: string = "";
  posicion: string = "";
  pasillo: string = "";
  sector: string = "";
  id_Ubicacion: number = 0;
  id_Sector: number = 0;
  codigoBarra: string = "";
  strUbicacion: string = "";
  @ViewChild('inputUbi', { read: ElementRef }) private inputUbi:ElementRef;
  vParameter: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sAlmac: AlmacenajeServiceProvider, public sGlobal: GlobalServiceProvider) {
      this.vParameter = this.navParams.get('listUA');
  }
  
  ngAfterViewInit() {
    debugger;
    console.log('inputUbi (afterviewinit)', this.inputUbi.nativeElement);
  }

  verificarUbicacion(): void{
    debugger;
    if(this.strUbicacion.trim() != ""){
      this.sAlmac.listarUbicacionXCodigoBarra(this.strUbicacion, this.sGlobal.Id_Almacen).then(result=>{
        let res: any = result;
        debugger;
        if(res.length != 0){
          this.fila = res[0].Fila;
          this.columna = res[0].Columna;
          this.nivel = res[0].Nivel;
          this.posicion = res[0].Posicion;
          this.pasillo = res[0].Pasillo;
          this.id_Ubicacion = res[0].Id_Ubicacion;
          this.codigoBarra = res[0].CodigoBarra;
          this.id_Sector = res[0].Id_Sector;
          this.sector = res[0].Sector;
          alert('Código de ubicación, verificado correctamente.');
  
        }else{
          alert('La ubicación no es correcta');
        }
      });
    }else{
      alert('Ingrese ubicación');
    }
  }

  registrarUbic(): void{
    debugger;
    if(this.strUbicacion.trim() != "") {
      this.registrarUAsUbicacion(this.vParameter, this.id_Ubicacion, this.sGlobal.userName);
    }else{
      alert('Ingresar ubicación');
      this.selectAll(this.inputUbi);
    }
  }

  selectAll(el: ElementRef){
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    nativeEl.select();
  }

  registrarUAsUbicacion(listStrUA, intId_Ubicacion, strUsuario): void{
    debugger;
    this.sAlmac.registrarUAsUbicacion(listStrUA, intId_Ubicacion, strUsuario).then(result=>{
      debugger;
      let res:any = result;
      if(res.errNumber == 0){
        alert('Se ubicó correctamente');
      }else{
        alert(res.message);
      }
    });
  }

  // [OperationContract]
  // [WebInvoke(UriTemplate = "/RegistrarUAsUbicacion/strUA/intIdUbicacion/strUsuario", Method = "POST", ResponseFormat = WebMessageFormat.Json,
  //     RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
  // Entidades.Mensaje RegistrarUAsUbicacion(List<string> strUA, int intIdUbicacion, string strUsuario);

}
