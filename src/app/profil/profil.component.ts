import { Component, OnInit } from '@angular/core';
import { AutheService } from '../services/authe.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private authe: AutheService) { }

  pseudo;
  email;
  txt;
  msg;
  etoiles;
  nomColoc;
  visible;
  nbEtoiles;
  nbEtoilesColoc;
  nbEtoilesPercent;

  user = this.authe.getUserCo();
  colocActuelle = this.user.coloc;
  taches;
  tachesUser;


  ngOnInit(): void {
    this.getPseudo();
    this.getTachesColoc();
    this.getEtoiles();
    this.getEtoilesColoc();
    this.getTachesUser();
    this.getEtoilesPercent();
    console.log('id User : ' + this.user.idUser);
  }

  public getPseudo() {
    this.user = this.authe.getUserCo();
    this.pseudo = this.user.pseudo;
    this.email = this.user.email;
    this.nomColoc = this.user.coloc.nomColoc;
  }



  public deconnexion() {
    this.authe.deconnectUser();
    this.router.navigateByUrl('/connexion');
  }

  redirectionColoc() {
    this.user = this.authe.getUserCo();
    if (this.user.coloc != null) {
      this.router.navigateByUrl('/macoloc');
    } else {
      this.msg = "Vous n'avez pas encore de colocation ! Trouvez-en une en recherchant"
    }
  }

  getTachesColoc(): void {
    this.http.post('http://localhost:8085/getTachesColoc', this.colocActuelle.idColoc).subscribe({
      next: (data) => {
        this.taches = data;
        console.log(this.taches)

      },
      error: (err) => { console.log(err) }


    });
  }

  getTachesUser(): void {
    this.http.post('http://localhost:8085/getTachesUser', this.user.idUser).subscribe({
      next: (data) => {
        this.tachesUser = data;
        console.log(this.tachesUser)

      },
      error: (err) => { console.log(err) }


    });
  }


  getEtoiles(): void {
    this.http.post('http://localhost:8085/getEtoilesUser', this.user.idUser).subscribe({
      next: (data) => {
        this.nbEtoiles = data;
        console.log('nb etoiles user' + this.nbEtoiles)

      },
      error: (err) => { console.log(err) }


    });
  }

  getEtoilesColoc(): void {
    this.http.post('http://localhost:8085/getEtoilesColoc', this.colocActuelle.idColoc).subscribe({
      next: (data) => {
        this.nbEtoilesColoc = data;
        console.log('nb etoiles coloc = ' + this.nbEtoilesColoc)

      },
      error: (err) => { console.log(err) }

    });
  }

  public getEtoilesPercent() {
    this.http.post('http://localhost:8085/getEtoilesPercent', this.user.idUser).subscribe({
      next: (data) => {
        this.nbEtoilesPercent = data;

        console.log('Le pourcentage des tâches réalisées est de : ' + this.nbEtoilesPercent)
      },
      error: (err) => { console.log(err) }
    });


  }


}

