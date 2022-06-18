import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthComponent} from "./auth.component";
import {RegisterComponent} from './register/register/register.component';
import {LoginComponent} from './login/login/login.component';

const ROUTES: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: '', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  }
]


@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class AuthModule {
}
