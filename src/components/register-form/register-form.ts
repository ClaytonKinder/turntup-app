import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Pages
import { LoginPage } from '../../pages/login/login';
/**
 * Generated class for the RegisterFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'register-form',
  templateUrl: 'register-form.html'
})
export class RegisterFormComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  form: FormGroup;
  @Output() formSubmitted = new EventEmitter<object>();

  constructor(
    public navCtrl: NavController,
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.form = fb.group({
      firstName: [this.firstName, Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: [this.lastName, Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: [this.email, Validators.compose([Validators.maxLength(50), Validators.email, Validators.required])],
      password: [this.password, Validators.compose([Validators.maxLength(50), Validators.required])],
    });
  }

  submitForm(form) {
    var obj = {
      formData: {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      },
      form: form
    }
    this.formSubmitted.emit(obj);
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

}
