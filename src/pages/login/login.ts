import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
// Providers
import { ToastProvider } from '../../providers/toast/toast';
import { UserProvider } from '../../providers/user/user';
// Pages
import { RegisterPage } from '../../pages/register/register';
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
    private navCtrl: NavController,
    private userProvider: UserProvider,
    private toast: ToastProvider,
  ){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit() {
    // initialize user model here
    this.formData = {};
  }

  getUser(form) {
    this.userProvider.getUser(this.formData).subscribe((res) => {
      this.toast.success('Successfully logged in as ' + res.email);
      form.reset();
    }, (err) => {
      this.toast.error(err._body.message);
    });
  }

  goToRegister() {
    this.navCtrl.setRoot(RegisterPage);
  }

}
