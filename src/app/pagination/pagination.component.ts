import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthGuardService } from '../auth-guard.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  pagecount=0;
  userDetail:any;
  repoDetails:any;
  currentPage=0;
  constructor(private httpService:HttpService, private authGuard:AuthGuardService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    let endpoint= 'users/'+this.authGuard.user;
    this.httpService.getWithHeader(endpoint).subscribe((response: any)=>{
      this.userDetail=response;
      this.pagecount=Math.ceil(response.public_repos/10);
    },
    (err)=>{
      if(err.error && err.error.message){
        this.toastr.error("Error: "+err.error.message);
      }else{
        this.toastr.error("Error while fetching user data");
      }
      console.log(err);
      this.router.navigateByUrl('/login');
    })
    this.goto(1);
  }
  goto(page:number){
    this.httpService.changeApiStatus(true);
    let previous =this.currentPage;
    this.currentPage=page;
    let endpoint= "users/"+this.authGuard.user+"/repos?per_page=10&page="+page;
    this.httpService.getWithHeader(endpoint).subscribe((response: any)=>{
      this.repoDetails=response;
    },
    (err)=>{
      this.currentPage=previous;
      if(err.error && err.error.message){
        this.toastr.error("Error: "+err.error.message);
      }else{
        this.toastr.error("Error while fetching user repo list");
      }
      console.log(err);
    })
  }

}
