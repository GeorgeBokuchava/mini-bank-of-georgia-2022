import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AccountsComponent} from "./accounts/accounts.component";
import {ShowComponent} from "./accounts/show/show.component";
import {CreateComponent} from "./accounts/create/create.component";
import {OperationsComponent} from "./operations/operations.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {KrnComponent} from "./krn.component";
import {KrnicpModule} from '../../../shared/krncip/krncip.module';


const ROUTES: Routes = [
  {path: '', redirectTo: 'krnicp', pathMatch: 'full'},
  {path: 'krnicp', component: KrnComponent},
  {path: 'accounts', component: AccountsComponent, children: [
      {path: '', component: ShowComponent},
      {path: 'create', component: CreateComponent}
    ]
  },
  {path: 'operations', component: OperationsComponent},
]

@NgModule({
  declarations: [
    KrnComponent,
    AccountsComponent,
    ShowComponent,
    OperationsComponent,
    CreateComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    KrnicpModule,
  ]
})
export class KrnModule {
}

