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
  url = 'http://localhost:8080/api/';
  constructor(public http: Http) {
    console.log('Hello UserProvider Provider');
  }

  ngOnInit() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
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
    }

    return error;
  }

  createUser(data) {
    console.log(data);
    return this.http.post(this.url + 'users', data, {headers: this.headers})
    .map(res => res.json())
    .catch((error:any) => this.handleUserError(error));
  }

  getUsers() {
    return this.http.get(this.url + 'users')
      .map(res => res.json())
      .catch(this.handleUserError);
  }

  getUser(data) {
    return this.http.post(this.url + 'user', data, {headers: this.headers})
    .map(res => res.json())
    .catch((error:any) => this.handleUserError(error));
  }

  updateUser(data) {
    console.log(data);
    return this.http.post(this.url + 'updateuser', data, {headers: this.headers})
    .map(res => res.json())
    .catch((error:any) => this.handleUserError(error));
  }

  deleteUser(user) {
    return this.http.delete(this.url + 'deleteuser', new RequestOptions({
      body: user
    })).map(
      res => res.json()
    ).catch((error:any) => this.handleUserError(error));
  }

}
