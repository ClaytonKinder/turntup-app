import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ToastProvider {

  constructor(
    public http: Http,
    private toast: ToastController,
  ) {
    console.log('Hello ToastProvider Provider');
  }

  default(msg) {
    let toast = this.toast.create({
      message: msg,
      duration: 3000,
      cssClass: 'text-center',
      position: 'top'
    });
    toast.present();
  }

  error(msg) {
    let toast = this.toast.create({
      message: msg,
      duration: 3000,
      cssClass: 'success text-center',
      position: 'top'
    });
    toast.present();
  }

  success(msg) {
    let toast = this.toast.create({
      message: msg,
      duration: 3000,
      cssClass: 'success text-center',
      position: 'top'
    });
    toast.present();
  }

}
