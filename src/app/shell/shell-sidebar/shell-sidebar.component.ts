import {Component, OnInit} from '@angular/core';
import {User} from "../modules/bpm/user.interface";

@Component({
  selector: 'app-shell-sidebar',
  templateUrl: './shell-sidebar.component.html',
  styleUrls: ['./shell-sidebar.component.scss']
})
export class ShellSidebarComponent implements OnInit {

  user!: User;

  constructor() {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '');
  }

}
