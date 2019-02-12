import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalServiceProvider {

  Id_Almacen : number = 2;
  Id_Impresora : number = 0;
  Id_Muelle : number = 0;
  Id_Centro : number = 0;
  Id_TerminalRF : number = 0;
  nombreAlmacen: string = "";
  nombreImpresora : string;
  nombreEmpresa : string; 
  userName : string = "";
  url : string = "";
  urlPrint : string =  "";
  usuario: string;
  produccion: string;
  tablaEst : string;
  recepcion : string;
  UMService : string;
  impresoraService : string;
  vUserData: any;
  pickingService:any;
  despacho:any;
  picking:any;
  almacenajeService:any;
  inventarioService: any;

  constructor(public http: HttpClient) {
    debugger;
    this.userName = "ADMIN";//"aromero";
    this.Id_Almacen = 2;
    this.Id_Muelle = 1;
    this.Id_TerminalRF = 2;
    this.nombreEmpresa = "TESLA S.A";
    this.nombreImpresora = "INTERMEC";
    this.nombreAlmacen = "Almacen 369";

    this.usuario = this.url + 'UsuarioService.svc/rest/';
    this.produccion = this.url + 'ProduccionService.svc/rest/';
    this.tablaEst = this.url + 'TablasEstaticasService.svc/rest/';
    this.recepcion = this.url + 'RecepcionService.svc/rest/';
    this.despacho = this.url + "DespachoService.svc/rest/";
    this.UMService = this.url + 'UnidadMedidaService.svc/rest/';
    this.picking = this.url + "PickingService.svc/rest/";
    this.impresoraService = this.urlPrint + "Impresiones.svc/rest/";
    this.pickingService = this.urlPrint + "PickingService.svc/rest/";
    this.pickingService = this.url + "PickingService.svc/rest/";
    this.almacenajeService = this.url + "AlmacenajeService.svc/rest/";
    this.inventarioService = this.url + "InventarioService.svc/rest/";
  }
}
