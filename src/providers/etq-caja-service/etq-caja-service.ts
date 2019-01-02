import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalServiceProvider } from '../global-service/global-service';

/*
  Generated class for the EtqCajaServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EtqCajaServiceProvider {
  
  headers = new Headers();
  constructor(public http: Http, public sGlobal: GlobalServiceProvider) {
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  listarUMxProducto(intIdProducto){
    let parameter = { 'intIdProducto' : intIdProducto };
    return new Promise(result=>{
      this.http.get(this.sGlobal.UMService + 'ListarUMXProducto', { params : parameter })
      .map(res=>res.json())
      .subscribe(data=>{
        result(data);
      },err => {
        console.log('Error listarUMxProducto', err);
      });
    })
  }

  listarSubAlmacenesXCuenta(intIdCuenta, intIdAlmacen){
    let parameter = { 'intIdCuenta' : intIdCuenta, 'intIdAlmacen' : intIdAlmacen };
    return new Promise(result=>{
      this.http.get(this.sGlobal.tablaEst + 'ListarSubAlmacenesXCuentaAlmacen', { params : parameter })
      .map(res => res.json())
      .subscribe(data=>{
        result(data);
      }, err => {
        console.log('Error listarSubAlmacenesXCuenta', err);
      });
    })
  }

  registrarUAMasivo(imp, idCentro){
    var parameter = {
      'imp' : imp,
      'idCentro': idCentro
    };

    return new Promise((result, reject)=>{
      this.http.post(this.sGlobal.recepcion + 'registrarUAMasivo/imp/idCentro', JSON.stringify(parameter), { headers : this.headers })
      .map(res => res.json())
      .subscribe(data=>{
        result(data);
      },err =>{
        console.log('Error registrarUAMasivo', err);
      })
    });
  }

  imprimirListaEtiquetas(lista, formato, nombreImpresora, esScript){
    var parameter = {
      'lista' : lista,
      'formato' : formato,
      'nombreImpresora' : nombreImpresora,
      'esScript' : esScript 
    };
    console.log(JSON.stringify(parameter));
    debugger;
    return new Promise((result, reject)=>{
      this.http.post(this.sGlobal.impresoraService+'imprimirListaEtiquetas/lista/formato/nombreImpresora/esScript', 
      JSON.stringify(parameter), {headers: this.headers})
      .map(res=>res.json())
      .subscribe(data=>{
        result(data);
      },err =>{
        console.log('Error imprimirListaEtiquetas', err);
      })
    });
  }

//   $.ajax({
//     type: 'POST',
//     url: proxy.svcPrint + 'imprimirListaEtiquetas/lista/formato/nombreImpresora/esScript',
//     data: JSON.stringify(datos),
//     dataType: 'json',
//     contentType: 'application/json',
//     beforeSend: function () {

//         $("#mImprimir .btn.imprimir").hide();
//     },
//     success: function (data) {
//         var error = (data.errNumber == 0) ? false : true;

//         toastr[(error) ? "error" : "success"](data.mensaje, (error) ? "Error" : "Correcto");
//         $('#mImprimir').modal('hide');
//         //console.log(data);
//     },
//     complete: function () {
//         $("#mImprimir .btn.imprimir").show();
//     },
//     error: function () {
//         toastr.error('No se pudo imprimir', "Error");
//     }
// });
}