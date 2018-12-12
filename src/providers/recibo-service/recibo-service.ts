import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
/*
  Generated class for the ReciboServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReciboServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ReciboServiceProvider Provider');
  }
}