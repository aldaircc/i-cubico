import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverPickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-picking',
  templateUrl: 'popover-picking.html',
})


export class PopoverPickingPage {

  

  constructor(public viewCtrl: ViewController) {
    let page = viewCtrl.data.page;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPickingPage');
  }

  itemClick(item){
    debugger;
    this.viewCtrl.dismiss(item);
  }

}
