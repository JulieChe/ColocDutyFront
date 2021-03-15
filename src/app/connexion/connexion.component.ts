import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  login;
  password;
  user;

  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
  }

  getLogin(login): any {
    this.login = login;
  }

  getPassword(password): any {
    this.password = password;
  }

  checkCo(id): any {

    if (id==0) {
      this.router.navigateByUrl('/connexion');
    } else {
      this.router.navigateByUrl('/test');
    }

  }

  connexion(user): void {
    console.log('afficher le user ', user);
    this.http.post('http://localhost:8085/connexion', user).subscribe(() => {
      // On a créé l'utilisateur, on retourne sur la page de connexion
      console.log('user envoyé');

    }, err => {
      // L'utilisateur n'a pas été créé on affiche un message d'erreur
      console.log('erreur envoi user' + err);
    });
    this.http.get('http://localhost:8085/connexion').subscribe({
      next: (id) => {this.user.id = id;
        if (id==0) {
          this.router.navigateByUrl('/connexion');
        } else {
          this.router.navigateByUrl('/test');
        }
      },
      error: (err) => {console.log('erreur envoi id' + err);}
    })
    
    
  }

  getId():void{
    this.http.get('http://localhost:8085/connexion').subscribe({
      next: (id) => {this.user.id = id;},
      error: (err) => {console.log(err);}
    })
   
  }
}
