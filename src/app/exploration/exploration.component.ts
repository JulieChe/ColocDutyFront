import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColocService } from '../services/coloc.service';
import { Router } from '@angular/router';
import { AutheService } from '../services/authe.service';


@Component({
  selector: 'app-exploration',
  templateUrl: './exploration.component.html',
  styleUrls: ['./exploration.component.css']
})
export class ExplorationComponent implements OnInit {
  [x: string]: any;

  constructor(private http: HttpClient, private coloc: ColocService, private router: Router , private authe: AutheService) { }


  colocation;

  id;
  userId;
  msg;
  msgColoc;
  user;
  currentUser;
  currentColoc;
  loyer;
  capacite;
  adresseVille;
  allColoc;
  listeColocFiltree;
  filtre;
  
 

  elements: any = [];
  headElements = ['Nom ', 'capacité', 'Description'];

  ngOnInit(): void {
    this.http.get('http://localhost:8085/coloc').subscribe({
      next: (data) => {
        this.colocation = data;
        this.allColoc = data;
      },
      error: (err) => { console.log(err) }
    });

    this.currentUser = this.authe.getUserCo();
    console.log("COLOC",this.currentUser.coloc)
  
    this.listeColocFiltree=this.colocation; //initialisation du resultat du filtre
  }

  //-----------------------------------------------------------------Import depuis Accueil-sans-coloc --------------------------------------------------------------------------
  filtreColoc(): void {
    this.filtre={"loyer":this.loyer,"capacite":this.capacite,"adresse":{"ville":this.adresseVille}};
    console.log(this.filtre);
    this.http.post('http://localhost:8085/getColocByCapaciteAndLoyerAndVille',this.filtre).subscribe({
    next:(data)=>{
      console.log("API reçue");
      this.colocation=data;
    },
    error: (err)=>{
      console.log("Problème de réception API");
      console.log(err)
    }
    


    })

       
  }





  //-----------------------------------------------------------------Fin Import depuis Accueil-sans-coloc --------------------------------------------------------------------------


  // Fonction de sélection de coloc pour afficher la description
  redirection(idColoc): void {

    console.log(idColoc);
    this.coloc.scoloc = idColoc; // sauvegarde en session de l' ID de la colocation sélectionnée
    this.router.navigateByUrl('public-coloc');



  }

  retourAccueil(): void {
    if (this.currentUser.coloc != null){
      this.router.navigateByUrl('/macoloc');
    } else {
      this.router.navigateByUrl('/accueilSansColoc');
    }
  }


}
