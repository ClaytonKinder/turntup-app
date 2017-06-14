import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterFormComponent } from './register-form';

@NgModule({
  declarations: [
    RegisterFormComponent,
  ],
  imports: [
    IonicPageModule.forChild(RegisterFormComponent),
  ],
  exports: [
    RegisterFormComponent
  ]
})
export class RegisterFormComponentModule {}
