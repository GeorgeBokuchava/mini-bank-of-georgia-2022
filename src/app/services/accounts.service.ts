import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
// import {Client, User} from "../shell/modules/bpm/user.interface";
import {catchError, filter} from "rxjs/operators";
import {of} from "rxjs";
import {Client} from '../shell/modules/bpm/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  URL = 'https://bog-angular-course-api.herokuapp.com';
  headers: any;
  err: any;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
    })
  }


  createUser(firstName: string, lastName: string, points: any) {
    const body = JSON.stringify({
      "firstName": firstName,
      "lastName": lastName,
      "plusPoints": points,
    })
    return this.http.put(`${this.URL}/clients`, body, {headers: this.headers})
      .pipe(
        catchError(err => this.err = of(err.error)),
        filter((): boolean => !this.err),
      )
  }

  getUsers(firstName: string, lastName: string, key: any) {
    return this.http.get<Client[]>(`${this.URL}/clients?firstName=${firstName}&lastName=${lastName}&clientKey=${key}`,
    {headers: this.headers})
  .pipe(
      catchError(err => this.err = of(err.error)),
      filter((): boolean => !this.err),
    )
  }

  createAccount(clientKey: number, accountName: string, amount: number) {
    const body = JSON.stringify({
      "clientKey": clientKey,
      "accountName": accountName,
      "amount": amount,
    })
    return this.http.put(`${this.URL}/accounts`, body, {headers: this.headers})
      .pipe(
        catchError(err => this.err = of(err.error)),
        filter((): boolean => !this.err),
      )
  }

  getAccounts(clientKey: number) {
    return this.http.get(`${this.URL}/accounts?clientKey=${clientKey}`,
    {headers: this.headers})
  .pipe(
      catchError(err => this.err = of(err.error)),
      filter((): boolean => !this.err),
    )
  }

  getAllAccounts() {
    return this.http.get(`${this.URL}/accounts`,
    {headers: this.headers})
  .pipe(
      catchError(err => this.err = of(err.error)),
      filter((): boolean => !this.err),
    )
  }

  deleteAccount(accountKey: number) {

    return this.http.delete<Response>(
      `${this.URL}/accounts?accountKey=${accountKey}`,
    {headers: this.headers,}
  ).pipe(
      catchError(err => this.err = of(err.error)),
      filter((): boolean => !this.err),
    )
  }

  transferAmount(senderKey: number, receiverKey: number, amount: number) {
    const body = JSON.stringify({
      "senderAccountKey": senderKey,
      "receiverAccountKey": receiverKey,
      "amount": amount
    });
    return this.http.post(`${this.URL}/transfer`, body, {headers: this.headers})
      .pipe(
        catchError(err => this.err = of(err.error)),
        filter((): boolean => !this.err),
      )
  }
}
