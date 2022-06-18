import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError, filter} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {AccountsService} from '../../../services/accounts.service';
import {AuthService} from '../../../services/auth.service';
import {BGValidators} from '../../form-validator/formValidator';
import {LoaderService} from '../../../shared/loader/loader.service';



@Component({

  selector: 'bg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private accountService: AccountsService,
    private router: Router,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit() {
    this.initForm();
  }


  get controls() {
    return this.form.controls;
  }

  login() {
    const [userName, password] = Object.keys(this.controls).map((key) => this.controls[key].value);
    console.log(userName);
    console.log(password);
    this.authService.login(userName, password).pipe(
      this.loaderService.useLoader,
    ).subscribe(user => {
      if (user.token) {
        localStorage.clear();
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['bpm']);
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
      userName: new FormControl(undefined,
        [BGValidators.required, BGValidators.minLength(2), BGValidators.maxLength(30), BGValidators.pattern(/^\S+$/)]),
      password: new FormControl(undefined, [BGValidators.required, BGValidators.minLength(2), BGValidators.maxLength(30)]),
    });
  }

}
