import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginFormComponent } from './login-form';

@NgModule({
  declarations: [
    LoginFormComponent,
  ],
  imports: [
    IonicPageModule.forChild(LoginFormComponent),
  ],
  exports: [
    LoginFormComponent
  ]
})
export class LoginFormComponentModule {}
