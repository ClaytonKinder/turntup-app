import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  formData;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private toastCtrl: ToastController,
  ){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit() {
    // initialize user model here
    this.formData = {};
  }

  getUser(form) {
    console.log(this.formData);
    this.userProvider.getUser(this.formData).subscribe((res) => {
      let toast = this.toastCtrl.create({
        message: 'Successfully logged in as ' + res.username,
        duration: 3000,
        cssClass: 'text-center',
        position: 'top'
      });
      toast.present();
      form.reset();
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: err.body.message,
        duration: 3000,
        cssClass: 'error text-center',
        position: 'top'
      });
      toast.present();
    });
  }

  goToRegister() {
    this.navCtrl.setRoot(RegisterPage);
  }

}
