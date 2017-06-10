import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
  url = 'http://localhost:8080/api/';
  constructor(public http: Http) {
    console.log('Hello UserProvider Provider');
  }

  createUser(data) {
    console.log(data);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'users', data, {headers:headers})
    .map(res => res.json())
  }

  getUsers() {
    console.log('Getting users');
    return this.http.get(this.url + 'users')
      .map(res => res.json())
  }

  deleteUser(user) {
    console.log('Deleting user: ', user);
    return this.http.delete(this.url + 'deleteuser', new RequestOptions({
      body: user
    }))
      .map(res => res.json())
  }

}
