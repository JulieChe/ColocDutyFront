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


  colocActuelle;

  ngOnInit(): void {

    this.getColoc(this.coloc.scoloc);
    console.log('Id de la Coloc Actuelle : ' + this.colocActuelle.nomColoc)
  }

  redirect(): void {
    this.router.navigateByUrl('/accueilSansColoc');
  }

  getColoc(idColoc): void {
    this.http.post('http://localhost:8085/getColoc',idColoc).subscribe({
      next: (data) => { this.colocActuelle = data 
     },
      error: (err) => {
        console.log(err);
      }
    })
  }

  sendDem(): void {

  }

}
