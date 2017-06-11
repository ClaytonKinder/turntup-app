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

  private handleUserError(error:any) {
    error.body = JSON.parse(error._body);
    var c = error.body.code;
    if (c == 11000) {
      error = this.handleDuplicateError(error);
    }

    console.error(error);
    return Observable.throw(error);
  }

  private handleDuplicateError(error:any) {
    error.body.duplicates = error.body.error.match(/index\:\ [a-z_]+\.[a-z_]+\.\$([a-z_]+)\_[0-9a-z]{1,}\s+dup key[: {]+"(.+)"/).splice(1,3);
    var dupes = error.body.duplicates;
    if (dupes[0] == 'email') {
      error.body.message = 'Your email address must be unique.';
    } else if (dupes[0] == 'username') {
      error.body.message = 'Your username must be unique.';
    }

    return error;
  }

  createUser(data) {
    console.log(data);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'users', data, {headers:headers})
    .map(res => res.json())
    .catch((error:any) => this.handleUserError(error));
  }

  getUsers() {
    console.log('Getting users');
    return this.http.get(this.url + 'users')
      .map(res => res.json())
      .catch(this.handleUserError);
  }

  deleteUser(user) {
    console.log('Deleting user: ', user);
    return this.http.delete(this.url + 'deleteuser', new RequestOptions({
      body: user
    })).map(
      res => res.json()
    ).catch((error:any) => this.handleUserError(error));
  }

}
