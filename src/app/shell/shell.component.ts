import {Component, OnInit} from '@angular/core';
import {AccountsService} from "../services/accounts.service";
import {LoaderService} from '../shared/loader/loader.service';


@Component({
  selector: 'bg-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {


  constructor(
    public accountService: AccountsService,
    public loadService: LoaderService
  ) {
  }

  get curDate() {
    const d = new Date();
    return `${('0' + d.getDate()).slice(-2)}/${('0' + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()}`;
  }

  ngOnInit(): void {

  }
}
