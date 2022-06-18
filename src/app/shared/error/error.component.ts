import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AccountsService} from '../../services/accounts.service';


@Component({
  selector: 'bg-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  showError:boolean = true;
  error: boolean = false;

  constructor(
    public authService: AuthService,
    public accountService: AccountsService
  ) {
  }

  ngOnInit(): void {
  }


  close(): void{
    this.showError = false;
    this.authService.err = '';
    this.accountService.err = '';
  }
  closeErr(e: any){
    this.showError = e;
  }

}
