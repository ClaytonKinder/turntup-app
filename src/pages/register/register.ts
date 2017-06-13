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
  updateData;
  updateForm;
  editMode;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private toastCtrl: ToastController,
  ){}

  ngOnInit() {
    this.formData = {}
    this.updateData = {};
    this.editMode = false;
    this.getUsers();

    console.log(this.editMode);
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

  registerUser(form) {
    this.userProvider.createUser(this.formData).subscribe((res: Response) => {
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

  updateUser(form) {
    this.userProvider.updateUser(this.updateData).subscribe((res: Response) => {
      this.getUsers();
      form.reset();
      this.editMode = false;
      this.updateData = {};
    }, (err) => {
      console.log(err);
      // let toast = this.toastCtrl.create({
      //   message: err.body.message,
      //   duration: 3000,
      //   cssClass: 'error text-center',
      //   position: 'top'
      // });
      // toast.present();
    });
  }

  cancelUpdate() {
    this.editMode = false;
    this.updateData = {};
  }

  editUser(user) {
    console.log(user);
    this.updateData = user;
    this.editMode = true;
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

}
