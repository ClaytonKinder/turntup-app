import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';
import { LoginPage } from '../../pages/login/login';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  form: FormGroup;
  @Input() formData: Object;
  @Output() formSubmitted = new EventEmitter<object>();

  constructor(
    public navCtrl: NavController,
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.form = fb.group({
      firstName: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.maxLength(50), Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
    });
  }

  submitForm(form) {
    var obj = {
      formData: this.formData,
      form: form
    }
    this.formSubmitted.emit(obj);
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

}
