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
  headers;
  url = 'http://localhost:8080/api/users/';
  constructor(public http: Http) {
    console.log('Hello UserProvider Provider');
  }

  ngOnInit() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  private handleUserError(error:any, msg) {
    if (error._body) {
      if (typeof error._body == 'string') {
        error._body = JSON.parse(error._body);
      }
      var c = error._body.code;
      if (c == 11000) {
        error = this.handleDuplicateError(error);
      }
    }

    if (!error._body.message && msg) {
      error._body.message = msg;
    }

    console.error(error);
    return Observable.throw(error);
  }

  private handleDuplicateError(error:any) {
    error._body.duplicates = error._body.error.match(/index\:\ [a-z_]+\.[a-z_]+\.\$([a-z_]+)\_[0-9a-z]{1,}\s+dup key[: {]+"(.+)"/).splice(1,3);
    var dupes = error._body.duplicates;
    if (dupes[0] == 'email') {
      error._body.message = 'Your email address must be unique.';
    }

    return error;
  }

  createUser(data) {
    return this.http.post(this.url + 'createuser', data, {headers: this.headers})
    .map(res => res.json())
    .catch((error:any) => this.handleUserError(error, 'Could not create user at this time.'));
  }

  getUsers() {
    return this.http.get(this.url + 'getusers')
      .map(res => res.json())
      .catch((error:any) => this.handleUserError(error, 'Could not get users at this time.'));
  }

  getUser(data) {
    return this.http.post(this.url + 'getuser', data, {headers: this.headers})
    .map(res => res.json())
    .catch((error:any) => this.handleUserError(error, 'Could not get user at this time.'));
  }

  updateUser(data) {
    return this.http.post(this.url + 'updateuser', data, {headers: this.headers})
    .map(res => res.json())
    .catch((error:any) => this.handleUserError(error, 'Could not update user at this time.'));
  }

  deleteUser(user) {
    return this.http.delete(this.url + 'deleteuser', new RequestOptions({
      body: user
    })).map(
      res => res.json()
    ).catch((error:any) => this.handleUserError(error, 'Could not delete user at this time.'));
  }

}
