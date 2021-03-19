import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheService } from '../services/authe.service';
import { LienbackService } from '../services/lienback.service';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']

})
export class InscriptionComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router ,private authe: AutheService, private lien: LienbackService) { }

  user;
  msg = null;
  signin;
  visible;
  ngOnInit(): void {
  }

  cacherAff(user): boolean {
    if (this.authe.getUserCo() != null) {
      this.visible = false;
    }
    else {
      this.visible = true;
    }
    return this.visible;
  }

  userCreate(user): void {
    console.log('afficher le user ', user);
    if (user.password === user.password2) {
      this.http.post(this.lien.lien+'saveuser', user).subscribe(() => {
        // On a créé l'utilisateur, on retourne sur la page de connexion
        console.log('user créé');
        this.msg = 'Utilisateur créé';
      }, err => {
        // L'utilisateur n'a pas été créé on affiche un message d'erreur
        console.log('erreur création user' + err);
        this.msg = 'Erreur création du nouvel utilisateur !';
      });
    } else {
      this.msg = 'Les mots de passe sont différents !';
      console.log('Attention, les mdp sont différents');
    }
  }

  retourConnexion(): void {
    this.router.navigateByUrl('/connexion');
  }

  userSignIn(user): void {

    this.http.post(this.lien.lien+'inscription', user, {responseType: 'text'}).subscribe({
      next: (data) => {
        console.log("Données réceptionnées");
        this.signin = data;
        if(this.signin==="errorLogin") {
          this.msg='Login déjà utilisé';
        } else if(this.signin==="errorEmail"){
          this.msg='email déjà utilisé';
        } else this.msg='Bienvenue '+ user.pseudo;
        this.retourConnexion();
      },
      error: (err) => {
        console.log("Erreur de réception de données API");
        console.log(err);
      }
    });

   

}

}