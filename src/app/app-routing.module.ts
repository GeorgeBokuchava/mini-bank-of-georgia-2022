import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShellComponent} from "./shell/shell.component";
import {AuthGuard} from "./services/auth.guard";


const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: '', component: ShellComponent, canActivate: [AuthGuard], children: [
      {path: 'bpm', loadChildren: () => import('./shell/modules/bpm/bpm.module').then(m => m.BpmModule)},
      {path: 'krn', loadChildren: () => import('./shell/modules/krn/krn.module').then(m => m.KrnModule)},
      {path: 'pmd', loadChildren: () => import('./shell/modules/pmd/pmd.module').then(m => m.PmdModule)},
    ]
  },
  {path: '**', redirectTo: '/auth'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
