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

    this.getColoc(this.coloc.scoloc);               // récupération des informations de la coloc dans colocActuelle
    
  }

  retour(): void {
    this.router.navigateByUrl('/exploration');
  }
  redirect(): void {
    this.router.navigateByUrl('/accueilSansColoc');
  }

  getColoc(idColoc): void {
    this.http.post('http://localhost:8085/getColoc',idColoc).subscribe({
      next: (data) => { this.colocActuelle = data ;
        console.log("Coloc sélectionnée : Coloc n°" + this.colocActuelle.idColoc);
        console.log("Description : " +this.colocActuelle.descColoc);
        console.log("capacité : " + this.colocActuelle.capacite);
        console.log("loyer  : " + this.colocActuelle.loyer);
     },
      error: (err) => {
        console.log(err);
      }
    })
  }

  sendDem(): void {

  }

}
