import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalServiceProvider {

  Id_Almacen : number = 1;
  Id_Impresora : number = 0;
  nombreImpresora : string;
  nomberEmpresa : string;
  userName : string = "";
  url : string = "";
  urlPrint : string = "";
  usuario: string;
  produccion: string;
  tablaEst : string;
  recepcion : string;
  UMService : string;
  impresoraService : string;
  vUserData: any;
  
  constructor(public http: HttpClient) {
    this.userName = "acosetito";
    this.nomberEmpresa = "TESLA S.A";
    this.usuario = this.url + 'UsuarioService.svc/rest/';
    this.produccion = this.url + 'ProduccionService.svc/rest/';
    this.tablaEst = this.url + 'TablasEstaticasService.svc/rest/';
    this.recepcion = this.url + 'RecepcionService.svc/rest/';
    this.UMService = this.url + 'UnidadMedidaService.svc/rest/';
    this.impresoraService = this.urlPrint + "Impresiones.svc/rest/";
  }
}
