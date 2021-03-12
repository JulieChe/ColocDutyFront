import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  constructor(private http: HttpClient) { }

  user;

  ngOnInit(): void {
  }

  userCreate(user): void {
    console.log('afficher le user ', user);
    this.http.post('http://localhost:8085/saveuser', user).subscribe(() => {
      // On a créé l'utilisateur, on retourne sur la page de connexion
      console.log('user créé');

    }, err => {
      // L'utilisateur n'a pas été créé on affiche un message d'erreur
      console.log('erreur création user' + err);
    });

  }

}
