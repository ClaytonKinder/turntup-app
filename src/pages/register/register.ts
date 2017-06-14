import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  form: FormGroup;
  formData;
  users;
  registerForm;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    private toastCtrl: ToastController,
    @Inject(FormBuilder) fb: FormBuilder
  ){
    this.form = fb.group({
      firstName: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.maxLength(50), Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
    });
  }

  ngOnInit() {
    this.formData = {};
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

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

}
