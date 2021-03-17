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
  msg; 
  etoiles = 2;
  nomColoc = "Nom de ma Coloc"; 
  visible; 


  ngOnInit(): void {
    this.getPseudo();
  }

  public getPseudo() {
    this.user = this.authe.getUserCo();
    this.pseudo = this.user.pseudo;
    this.email = this.user.email
  }

  public deconnexion(){
    this.authe.deconnectUser();
    this.router.navigateByUrl('/connexion');
  }

  redirectionColoc(){
    this.user = this.authe.getUserCo(); 
    if(this.user.coloc != null){
      this.router.navigateByUrl('/macoloc');
    } else {
      this.msg = "Vous n'avez pas encore de colocation ! Trouvez-en une en recherchant"
    }
  }


  }

