import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ToastProvider } from '../../providers/toast/toast';
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
  users;
  registerForm;
  constructor(
    private userProvider: UserProvider,
    private toast: ToastProvider,
  ){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userProvider.getUsers().subscribe(data => {
      this.users = data;
    }, (err) => {
      this.toast.error(err._body.message);
    });
  }

  deleteUser(user) {
    this.userProvider.deleteUser(user).subscribe(data => {
      this.getUsers();
    }, (err) => {
      this.toast.error(err._body.message);
    });
  }

  registerUser(obj) {
    this.userProvider.createUser(obj.formData).subscribe((res: Response) => {
      this.getUsers();
      obj.form.reset();
    }, (err) => {
      this.toast.error(err._body.message);
    });
  }
}
