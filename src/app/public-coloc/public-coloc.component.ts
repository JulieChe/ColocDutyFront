import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheService } from '../services/authe.service';
import { ColocService } from '../services/coloc.service';
import { LienbackService } from '../services/lienback.service';

@Component({
  selector: 'app-public-coloc',
  templateUrl: './public-coloc.component.html',
  styleUrls: ['./public-coloc.component.css']
})
export class PublicColocComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private authe: AutheService, private coloc: ColocService,private lien: LienbackService) { }

  msg = null;
  colocActuelle;
  userActuel;
  demande;

  userConnect;

  ngOnInit(): void {

    this.getColoc(this.coloc.scoloc);               // récupération des informations de la coloc dans colocActuelle
    this.getUser(this.authe.getUserCo().idUser);

    this.userConnect = this.authe.getUserCo();
  }

  retour(): void {
    this.router.navigateByUrl('/exploration');
  }
  redirect(): void {
    this.router.navigateByUrl('/accueilSansColoc');
  }

  getColoc(idColoc): void {
    this.http.post(this.lien.lien+'getColoc', idColoc).subscribe({
      next: (data) => {
        this.colocActuelle = data;
        console.log("Coloc sélectionnée : Coloc n°" + this.colocActuelle.idColoc);
        console.log("Description : " + this.colocActuelle.descColoc);
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
    this.http.post(this.lien.lien+'getUser', idUser).subscribe({
      next: (data) => {
        this.userActuel = data;
        console.log("User sélectionné : User n°" + this.userActuel.idUser);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  sendDemande(message): void {
    const user = { idUser: this.userConnect.idUser };
    const coloc = { idColoc: this.colocActuelle.idColoc };

    this.demande = { user: user, coloc: coloc, message: message.message, lu: false };

    // const headers = { 'Content-Type': 'application/json' };

    // this.demande = {idUser: idUser, idColoc: idColoc, message: message, lu: false};
    console.log('afficher la demande', this.demande);
    console.log('afficher la demande', this.demande);
    this.http.post(this.lien.lien+'savedemande', this.demande).subscribe({
      next: (data) => {

        console.log('Demande envoyée');
        this.msg = 'Demande envoyée';
      },
      error: (err) => {
        console.log(err);
      }
    });



  }
}