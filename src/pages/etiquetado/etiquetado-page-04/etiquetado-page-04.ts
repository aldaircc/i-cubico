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
  vParameter: any;
  @ViewChild('inputUbi', { read: ElementRef }) private inputUbi:ElementRef;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public sAlmac: AlmacenajeServiceProvider, public sGlobal: GlobalServiceProvider) {
      this.vParameter = this.navParams.get('listUA');
      this.rowCount = this.vParameter.length;
  }
  
  verificarUbicacion(): void{
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
          //this.strUbicacion = "";
          this.selectAll(this.inputUbi, 600);
  
        }else{
          alert('La ubicación no es correcta');
          this.fila = "";
          this.columna = "";
          this.nivel = "";
          this.posicion = "";
          this.pasillo = "";
          this.sector = "";
          this.id_Ubicacion = 0;
          this.codigoBarra = "";
          this.id_Sector = 0;
          this.strUbicacion = "";
          this.selectAll(this.inputUbi, 600);
        }
      });
    }else{
      alert('Ingrese ubicación');
      this.selectAll(this.inputUbi, 600);
    }
  }

  registrarUbic(): void{
    debugger;
    if(this.strUbicacion.trim() != "" && this.id_Ubicacion != 0) {
      this.registrarUAsUbicacion(this.vParameter, this.id_Ubicacion, this.sGlobal.userName);
    }else{
      alert('Ingresar y/o validar ubicación');
      this.selectAll(this.inputUbi, 600);
    }
  }

  selectAll(el: ElementRef, time){
    let nativeEl: HTMLInputElement = el.nativeElement.querySelector('input');
    setTimeout(()=>{
      nativeEl.select();
    }, time);
  }

  registrarUAsUbicacion(listStrUA, intId_Ubicacion, strUsuario): void{
    this.sAlmac.registrarUAsUbicacion(listStrUA, intId_Ubicacion, strUsuario).then(result=>{
      let res:any = result;
      if(res.errNumber == 0){
        alert('Se ubicó correctamente');
        this.fila = "";
        this.columna = "";
        this.nivel = "";
        this.posicion = "";
        this.pasillo = "";
        this.sector = "";
        this.id_Ubicacion = 0;
        this.codigoBarra = "";
        this.id_Sector = 0;
        this.strUbicacion = "";
        this.selectAll(this.inputUbi, 500);
      }else{
        alert(res.message);
        this.selectAll(this.inputUbi, 600);
      }
    });
  }

  ionViewWillEnter(){
    this.selectAll(this.inputUbi, 500);
  }
}
