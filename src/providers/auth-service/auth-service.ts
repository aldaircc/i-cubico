import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

//Arturo
@Injectable()
export class AuthService {
  apiUrl = '';
  constructor(public http : Http) {
  }
}