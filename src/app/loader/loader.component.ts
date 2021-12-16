import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  isLoading=false;
  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.isApiLoading.subscribe(resp=>{
      this.isLoading=resp;
    })
  }

}
