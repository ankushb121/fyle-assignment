import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  loginForm: FormGroup;
  title = 'fyle-assignment';
  isLoading=false;
  constructor(private httpService:HttpService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  ngOnInit() {
    this.httpService.isApiLoading.subscribe(resp=>{
      this.isLoading=resp;
    })
  }

}
