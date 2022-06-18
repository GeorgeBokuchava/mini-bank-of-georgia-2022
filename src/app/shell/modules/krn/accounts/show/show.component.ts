import {Component, OnInit} from '@angular/core';
import {Account, Client, User} from "../../../bpm/user.interface";
import {AccountsService} from "../../../../../services/accounts.service";
import {catchError, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {LoaderService} from '../../../../../shared/loader/loader.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  token!: string;
  clientKey!: number;
  accounts: Account[] = [];
  user!: Client;

  constructor(
    private accountService: AccountsService,
    private router: Router,
    public loaderService: LoaderService
  ) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('client') || '');
    this.clientKey = JSON.parse(localStorage.getItem('clientKey') || '');
    this.accountService.getAccounts(this.clientKey).pipe(this.loaderService.useLoader).subscribe(
      (res: any) => this.accounts = res,
    )
  }

  deleteAccount(accountKey: number) {
    this.accountService.deleteAccount(accountKey).pipe(
      this.loaderService.useLoader,
      switchMap(_ => this.accountService.getUsers(this.user.firstName, this.user.lastName, this.user.clientKey)),
    ).subscribe(
      user => {
        localStorage.removeItem('client');
        localStorage.setItem('client', JSON.stringify(user[0]));
        localStorage.removeItem('changed');
        localStorage.setItem('changed', 'true');
        this.router.navigate(['/krn'])
      },
    )
  }
}
