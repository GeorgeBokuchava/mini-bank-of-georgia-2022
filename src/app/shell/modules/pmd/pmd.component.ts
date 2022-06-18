import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Client, Account} from '../bpm/user.interface';
import {AccountsService} from '../../../services/accounts.service';
import {Router} from '@angular/router';
import {exhaustMap, map} from 'rxjs/operators';
import {LoaderService} from '../../../shared/loader/loader.service';
import {FormControl, FormGroup} from '@angular/forms';
import {BGValidators} from '../../../auth/form-validator/formValidator';

@Component({
  selector: 'app-pmd',
  templateUrl: 'pmd.component.html',
  styleUrls: ['./pmd.component.scss']
})
export class PmdComponent implements OnInit {

  user!: Client;
  clientKey: any;
  accounts: Account[] = [];
  allAccounts: Account[] = [];
  sender: any;
  receiver: any;
  amount!: number;
  form: FormGroup;

  constructor(
    private accountService: AccountsService,
    private router: Router,
    public loaderService: LoaderService
  ) {
  }


  ngOnInit(){
    this.clientKey = JSON.parse(localStorage.getItem('clientKey') || '');
    this.user = JSON.parse(localStorage.getItem('client') || '');

    this.accountService.getAccounts(this.clientKey).subscribe(
      (res: any) => this.accounts = res)

    this.accountService.getAllAccounts().subscribe(
      (res: any) => {
        this.allAccounts = res;
      });
    this.initForm();
  }

  senderValue(e: any) {
    this.sender = e.target.value;
  }

  receiverValue(e: any) {
    this.receiver = e.target.value;
  }

  submitForm() {
    this.accountService.transferAmount(this.sender, this.receiver, this.amount)
      .pipe(
        this.loaderService.useLoader,
        exhaustMap(() => this.accountService.getUsers(this.user.firstName, this.user.lastName, this.user.clientKey)),
      ).subscribe(
      user => {
        localStorage.removeItem('client');
        localStorage.setItem('client', JSON.stringify(user[0]));
        localStorage.removeItem('changed');
        localStorage.setItem('changed', 'true');
        this.router.navigate(['/krn']);
      }
    )
  }
  errors(controlName) {
    return this.get(controlName).errors && Object.values(this.get(controlName).errors);
  }

  get(controlName) {
    return this.form.get(controlName);
  }

  initForm() {
    this.form = new FormGroup({
      sender: new FormControl(undefined, [BGValidators.required,]),
      receiver: new FormControl(undefined, [BGValidators.required,]),
      amount: new FormControl(undefined, [BGValidators.required, BGValidators.maxLength(30)]),

    });
  }
}
