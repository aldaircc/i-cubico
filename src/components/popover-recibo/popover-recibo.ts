import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverReciboComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-recibo',
  templateUrl: 'popover-recibo.html'
})
export class PopoverReciboComponent {

  items:any;
  text: string;

  constructor(public viewCtrl: ViewController) {
    debugger;
    console.log('view controller', viewCtrl.data);
    console.log('Hello PopoverReciboComponent Component');
    this.text = 'Hello World';
    this.items = [
      {item : 'Impresora'},
      {item : 'Incidencia'}
    ]
  }

  itemClick(item){
    debugger;
    this.viewCtrl.dismiss(item);
  }

}