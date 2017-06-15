import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Pages
import { RegisterPage } from '../../pages/register/register';
/**
 * Generated class for the RegisterFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {
  email = '';
  password = '';
  form: FormGroup;
  @Output() formSubmitted = new EventEmitter<object>();

  constructor(
    public navCtrl: NavController,
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.form = fb.group({
      email: [this.email, Validators.compose([Validators.maxLength(50), Validators.email, Validators.required])],
      password: [this.password, Validators.compose([Validators.maxLength(50), Validators.required])],
    });
  }

  submitForm(form) {
    var obj = {
      formData: {
        email: this.email,
        password: this.password,
      },
      form: form
    }
    console.log(obj);
    this.formSubmitted.emit(obj);
  }

  goToRegister() {
    this.navCtrl.setRoot(RegisterPage);
  }

}
