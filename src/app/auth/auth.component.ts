import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {LoaderService} from '../shared/loader/loader.service';

@Component({
  selector: 'bg-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public loadService: LoaderService
  ) { }

  ngOnInit(): void {
  }

}
