import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpService } from '../http.service';
import { AuthGuardService } from '../auth-guard.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:FormControl;
  title = 'fyle-assignment';
  constructor(private httpService:HttpService, private authGuard:AuthGuardService,private router: Router,private toastr: ToastrService) { 
    this.username= new FormControl('', [Validators.required])
  }
  ngOnInit() {

  }

  onSubmit() {
    this.httpService.changeApiStatus(true);
    let endpoint = "users/"+this.username.value;
    this.httpService.getWithHeader(endpoint)
    .subscribe((response: any)=>{ 
      if(response.login){
        this.authGuard.setUser(response.login);
        this.router.navigateByUrl('/repo-list');
      }else{
        this.toastr.error(response.message);
      }
    },
    (err)=>{
      if(err.error && err.error.message){
        this.toastr.error("Error: "+err.error.message);
      }else{
        this.toastr.error("Error while processing");
      }
      console.log(err);
    })
  }

}
