import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']

})
export class InscriptionComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router ) { }

  user;
  msg = null;
  signin;
  visible;
  ngOnInit(): void {
  }

  cacherAff(idUser): boolean {
    if (localStorage.getItem('user') != null) {
      this.visible = true;
    }
    else {
      this.visible = false;
    }
    return this.visible;
  }

  userCreate(user): void {
    console.log('afficher le user ', user);
    if (user.password === user.password2) {
      this.http.post('http://localhost:8085/saveuser', user).subscribe(() => {
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

    this.http.post('http://localhost:8085/inscription', user, {responseType: 'text'}).subscribe({
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