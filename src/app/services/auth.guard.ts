import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {User} from "../shell/modules/bpm/user.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user!: User;

  constructor(
    private router: Router
  ) {
  }

  canActivate() {
    return !!localStorage.getItem('user') || this.router.navigate(['auth'])
  }
}
