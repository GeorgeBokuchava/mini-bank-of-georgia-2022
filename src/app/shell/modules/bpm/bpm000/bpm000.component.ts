import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AccountsService} from "../../../../services/accounts.service";
import {Client, User} from "../user.interface";
import {FormBuilder, FormsModule} from '@angular/forms';
import {LoaderService} from '../../../../shared/loader/loader.service';

@Component({
  selector: 'app-bpm000',
  templateUrl: './bpm000.component.html',
  styleUrls: ['./bpm000.component.scss']
})
export class Bpm000Component implements OnInit {


  firstName: string = '';
  lastName: string = '';
  key: string = '';
  clients$!: Observable<Client[]>;

  constructor(
    private accountService: AccountsService,
    public loaderService: LoaderService
  ) {
  }

  ngOnInit(): void {
  }

  search() {
    this.clients$ = this.accountService.getUsers(this.firstName, this.lastName, this.key).pipe(
      this.loaderService.useLoader
    )
    this.firstName = '';
    this.lastName = '';
    this.key = '';
  }

  saveUser(user: any) {
    localStorage.removeItem('client');
    localStorage.setItem('client', JSON.stringify(user));
  }

}

