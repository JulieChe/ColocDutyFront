import { Component, OnInit } from '@angular/core';
import { AutheService } from '../services/authe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private router: Router, private authe: AutheService) { }
  user;
  pseudo;
  email;
  txt;
  etoiles = 2;

  ngOnInit(): void {
    this.getPseudo();
  }

  public getPseudo() {
    this.user = this.authe.getUserCo();
    this.pseudo = this.user.pseudo;
    this.email = this.user.email
  }

  public deconnexion(){
    this.authe.deconnectUser;
    this.router.navigateByUrl('/connexion');
  }
}
