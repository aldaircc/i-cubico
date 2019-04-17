import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalServiceProvider {

  Id_Almacen : number = 1006;
  Id_Impresora : number = 0;
  Id_Muelle : number = 0;
  Id_Centro : number = 0;
  Id_TerminalRF : number = 0;
  nombreAlmacen: string = "";
  nombreImpresora : string;
  nombreEmpresa : string;
  nombreCentro: string;
  userName : string = "";
  apeNom: string = "";
  url : string = "http://172.16.32.15:8085/SGAA_WCF/";
  urlPrint : string =  "http://172.16.32.15:8085/SGAA_WCF_PRINT/";
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
  despachoService: any;

  constructor(public http: HttpClient) {
    this.userName = "ADMIN";
    this.apeNom = "Administrador";
    this.Id_Almacen = 1006;
    this.Id_Muelle = 1;
    this.Id_TerminalRF = 2;
    this.Id_Centro = 1;
    this.nombreEmpresa = "TESLA S.A";
    this.nombreImpresora = "INTERMEC";
    this.nombreAlmacen = "Almacen 369";
    this.nombreCentro = "Centro 01";
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
    this.despachoService = this.url + "DespachoService.svc/rest/";
  }
}
