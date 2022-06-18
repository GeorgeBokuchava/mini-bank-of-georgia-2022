import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KrnicpComponent} from './krncip.component';



@NgModule({
  declarations: [
    KrnicpComponent
  ],
  exports: [
    KrnicpComponent
  ],
  imports: [
    CommonModule
  ]
})
export class KrnicpModule { }
