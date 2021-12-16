import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes =  [{
  path: '',
  redirectTo: "login",
  pathMatch: "full"
}, 
{
  path: 'login',
  component: LoginComponent
}, 
{
  path: 'repo-list',
  component: PaginationComponent,
  canActivate: [AuthGuardService]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
