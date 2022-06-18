import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Bpm000Component} from "./bpm000/bpm000.component";
import {Bpm001Component} from "./bpm001/bpm001.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

const ROUTES: Routes = [
  {path: '', redirectTo: 'bpm000', pathMatch: 'full'},
  {path: 'bpm000', component: Bpm000Component},
  {path: 'bpm001', component: Bpm001Component}
]

@NgModule({
  declarations: [
    Bpm001Component,
    Bpm000Component,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class BpmModule { }
