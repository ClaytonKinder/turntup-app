import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/map'

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  formData;
  users;
  registerForm;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private toastCtrl: ToastController,
  ){}

  ngOnInit() {
    // initialize user model here
    this.formData = {}
    // this.users = this.userProvider.getUsers();
    this.getUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  getUsers() {
    this.userProvider.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(user) {
    this.userProvider.deleteUser(user).subscribe(data => {
      this.getUsers();
    });
  }

  onSubmit(form) {
    this.userProvider.createUser(this.formData).subscribe((res: Response) => {
      console.log(res);
      this.getUsers();
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

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

}
