import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, filter} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_API = 'https://bog-angular-course-api.herokuapp.com/';
  authHeaders: any;
  err: any;

  constructor(
    private http: HttpClient,
  ) {
    this.authHeaders = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
    });
  }


  login(userName: string, passWord: string) {
    const params = JSON.stringify({
      'username': userName,
      'password': passWord
    });
    return this.http.post(this.AUTH_API + 'login', params, {headers: this.authHeaders}).pipe(
      catchError(err => this.err = of(err.error)),
      filter(():boolean => !this.err)
    )

  }

  register(name: string, userName: string, passWord: string) {
    const params = JSON.stringify({
      'name': name,
      'username': userName,
      'password': passWord
    });
    return this.http.post(this.AUTH_API + 'register', params, {headers: this.authHeaders}).pipe(
      catchError(err => this.err = of(err.error)),
      filter(():boolean => !this.err)
    )
  }

}
