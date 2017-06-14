import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello RegisterFormComponent Component');
    this.text = 'Hello World';
  }

}
