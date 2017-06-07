import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
  }

  ngOnInit() {
    // initialize user model here
    this.formData = {}
    // this.users = this.userProvider.getUsers();
    this.userProvider.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
      console.log(this.users);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onSubmit(){
    console.log(this.formData);
    this.userProvider.createUser(this.formData);
  }

}
