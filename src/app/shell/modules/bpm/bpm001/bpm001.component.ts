import {Component, OnInit} from '@angular/core';
import {AccountsService} from "../../../../services/accounts.service";
import {User} from "../user.interface";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoaderService} from '../../../../shared/loader/loader.service';
import {BGValidators} from '../../../../auth/form-validator/formValidator';


@Component({
  selector: 'bg-bpm001',
  templateUrl: 'bpm001.component.html',
  styleUrls: ['bpm001.component.scss']
})
export class Bpm001Component implements OnInit{
  form!: FormGroup;

  constructor(
    private accountService: AccountsService,
    private router: Router,
    private fb: FormBuilder,
    public loaderService: LoaderService
  ) {

  }
  ngOnInit() {
    this.initForm();
  }

  get controls() {
    return this.form.controls;
  }

  createClient() {
    const [name, surName, points] = Object.keys(this.controls).map((key) => this.controls[key].value);
    this.accountService.createUser(name, surName, points).pipe(
      this.loaderService.useLoader
    )
      .subscribe(user => {
        if (user) {
          localStorage.removeItem('client');
          localStorage.setItem('client', JSON.stringify(user));
          this.router.navigate(['/krn'])
        }
      })
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
      surName: new FormControl(undefined, [BGValidators.required, BGValidators.maxLength(30)]),
      points: new FormControl(undefined, [BGValidators.required,]),
    });
  }
}
