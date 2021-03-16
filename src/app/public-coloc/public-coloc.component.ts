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

  msg = null;
  colocActuelle;
  userActuel;
  demande ;

  ngOnInit(): void {

    this.getColoc(this.coloc.scoloc);               // récupération des informations de la coloc dans colocActuelle
    this.getUser(this.authe.getUserCo().idUser);
    
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
        console.log(this.authe.getUserCo().idUser);
        console.log(this.authe.getUserCo().email);
     },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getUser(idUser): void {
    this.http.post('http://localhost:8085/getUser',idUser).subscribe({
      next: (data) => { this.userActuel = data ;
        console.log("User sélectionné : User n°" + this.userActuel.idUser);
     },
      error: (err) => {
        console.log(err);
      }
    })
  }

  sendDemande(message,idColoc,idUser): void {
    this.demande = {idUser: idUser, idColoc: idColoc, message: message, lu: false};
    console.log('afficher la demande', this.demande);
    if (this.demande =! null) {
      this.http.post('http://localhost:8085/savedemande', this.demande).subscribe(() => {
       
        console.log('Demande envoyée');
        this.msg = 'Demande envoyée';
      }, err => {
        
        console.log('Erreur envoi de la demande ' + err);
        this.msg = 'Erreur envoi de la demande !';
      });
    } else {
      this.msg = 'Attention, la demande doit d\'abord être créée.';
      console.log('Attention, la demande doit d\'abord être créée.');
    }
  }

}
