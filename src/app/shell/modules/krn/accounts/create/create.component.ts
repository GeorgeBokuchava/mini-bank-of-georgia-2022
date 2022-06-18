import {Component, NgZone, OnInit} from '@angular/core';
import {AccountsService} from "../../../../../services/accounts.service";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Client, User} from "../../../bpm/user.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoaderService} from '../../../../../shared/loader/loader.service';
import {BGValidators} from '../../../../../auth/form-validator/formValidator';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  user!: Client;
  clientKey: any;

  constructor(
    private accountService: AccountsService,
    private router: Router,
    private fb: FormBuilder,
    public loaderService: LoaderService
  ) {

  }

  get controls() {
    return this.form.controls;
  }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('client') || '');
    this.clientKey = JSON.parse(localStorage.getItem('clientKey') || '');
    this.initForm();
  }

  createAccount() {
    const [name, amount] = Object.keys(this.controls).map((key) => this.controls[key].value)
    this.accountService.createAccount(this.clientKey, name, amount).pipe(
      this.loaderService.useLoader,
      switchMap(_ => this.accountService.getUsers(this.user.firstName, this.user.lastName, this.user.clientKey)),
    ).subscribe(
      user => {
        localStorage.removeItem('client');
        localStorage.setItem('client', JSON.stringify(user[0]));
        localStorage.removeItem('changed');
        localStorage.setItem('changed', 'true');
        this.router.navigate(['/krn'])
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
      name: new FormControl(undefined, [BGValidators.required, BGValidators.maxLength(30)]),
      amount: new FormControl(undefined, [BGValidators.required,]),
    });
  }
}
