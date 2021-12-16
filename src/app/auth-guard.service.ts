import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  user='';
  constructor(private router: Router) {
  }


  setUser(name:string){
    this.user= name;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.user) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }
}
