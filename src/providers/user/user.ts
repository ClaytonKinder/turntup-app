import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
  url = 'http://localhost:8080/';
  constructor(public http: Http) {
    console.log('Hello UserProvider Provider');
  }

  createUser(data) {
    console.log(data);
	  let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + 'users', data)
      .map(this.extractData)
  }

  getUsers() {
    console.log('Getting users');
    return this.http.get(this.url + 'users')
      .map(res => res.json())
  }

  private extractData(res: Response) {
	  let body = res.json();
    return body.data || {};
  }

  private handleErrorObservable (error: Response | any) {
	  console.error(error.message || error);
	  return Observable.throw(error.message || error);
  }

}
