import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Route, Router} from "@angular/router";
import {AuthService} from '../../../services/auth.service';
import {BGValidators} from '../../form-validator/formValidator';
import {LoaderService} from '../../../shared/loader/loader.service';

@Component({
  selector: 'bg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
    private loaderService:LoaderService
  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  get controls() {
    return this.form.controls;
  }

  register() {
   if (this.form.valid){
     const [name, userName, password] = Object.keys(this.controls).map((key) => this.controls[key].value);

     this.authService.register(name, userName, password).pipe(
       this.loaderService.useLoader
     ).subscribe(user => {
       if (user.token) {
         localStorage.clear();
         localStorage.setItem('token', user.token);
         localStorage.setItem('user', JSON.stringify(user));
         this.router.navigate(['bpm']);
       }
     })
   }
  }

  errors(controlName) {
    return this.get(controlName).errors && Object.values(this.get(controlName).errors);
  }

  get(controlName) {
    return this.form.get(controlName);
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(undefined,
        [BGValidators.required, BGValidators.minLength(2), BGValidators.maxLength(30),]),
      userName: new FormControl(undefined, [BGValidators.required, BGValidators.minLength(2), BGValidators.maxLength(30),  BGValidators.pattern(/^\S+$/)]),
      password: new FormControl(undefined, [BGValidators.required, BGValidators.minLength(2), BGValidators.maxLength(30)]),
      confirmPassword:  new FormControl(undefined, [BGValidators.required, BGValidators.minLength(2), BGValidators.maxLength(30)]),
    }, {validators: BGValidators.passwordMatch});
  }

}
