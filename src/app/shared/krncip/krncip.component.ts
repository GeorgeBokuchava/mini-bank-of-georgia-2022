import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Client} from "../../shell/modules/bpm/user.interface";

@Component({
  selector: 'bg-krnicp',
  templateUrl: 'krncip.component.html',
  styleUrls: ['krncip.component.scss']
})
export class KrnicpComponent implements OnInit {

  user!: Client;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('client') || '');
    if (localStorage.getItem('changed')){
      this.router.navigate(['/krn/accounts'])
    }
  }

  goToAccounts(clientKey: number) {
    localStorage.removeItem('clientKey');
    localStorage.setItem('clientKey', JSON.stringify(clientKey));
    this.router.navigate(['/krn/accounts'])
  }

  goToMain(){
    localStorage.removeItem('changed');
    this.router.navigate(['/krn'])
  }

  goOperations(clientKey: number){
    localStorage.removeItem('clientKey');
    localStorage.setItem('clientKey', JSON.stringify(clientKey));
    localStorage.removeItem('changed');
    this.router.navigate(['/krn/operations'])
  }

  logOut(){
    localStorage.removeItem('changed');
    this.router.navigate(['bpm'])
  }

}
