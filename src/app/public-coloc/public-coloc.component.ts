import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheService } from '../services/authe.service';
import { ColocService } from '../services/coloc.service';

@Component({
  selector: 'app-public-coloc',
  templateUrl: './public-coloc.component.html',
  styleUrls: ['./public-coloc.component.css']
})
export class PublicColocComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private authe: AutheService, private coloc: ColocService) { }

  ngOnInit(): void {
  }

  redirect(): void{
    this.router.navigateByUrl('/test');
  }

  sendDem(): void{
    
  }

}
