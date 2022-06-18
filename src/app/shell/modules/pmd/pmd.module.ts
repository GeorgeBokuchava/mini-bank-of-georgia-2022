import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PmdComponent} from "./pmd.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {KrnicpModule} from '../../../shared/krncip/krncip.module';

const ROUTES: Routes = [
  {path: '', redirectTo: 'pmd311', pathMatch: 'full'},
  {path: 'pmd311', component: PmdComponent}
]


@NgModule({
  declarations: [
    PmdComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    KrnicpModule,
  ]
})
export class PmdModule {
}

