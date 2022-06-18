import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ShellComponent} from './shell/shell.component';
import {ShellHeaderComponent} from './shell/shell-header/shell-header.component';
import {ShellSidebarComponent} from './shell/shell-sidebar/shell-sidebar.component';
import {AuthComponent} from './auth/auth.component';
import {AuthService} from "./services/auth.service";
import {AuthInterceptor} from "./services/auth.interceptor";
import { PopupDirective } from './shell/shell-header/popup.directive';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ErrorComponent} from './shared/error/error.component';
import {RegisterComponent} from './auth/register/register/register.component';
import {LoginComponent} from './auth/login/login/login.component';
import {AuthGuard} from './services/auth.guard';
import { LoaderComponent } from './shared/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ShellComponent,
    ShellHeaderComponent,
    ShellSidebarComponent,
    AuthComponent,
    ErrorComponent,
    PopupDirective,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
