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
  nomColoc;
  listeColoc;

  elements: any = [];
  headElements = ['Nom ', 'capacité', 'Description'];

  ngOnInit(): void {
    this.http.get('http://localhost:8085/coloc').subscribe({
      next: (data) => {
        this.colocation = data;
        this.listeColoc = data;
      },
      error: (err) => { console.log(err) }
    });

    this.currentUser = this.authe.getUserCo();
    console.log("COLOC",this.currentUser.coloc)

  }

  //-----------------------------------------------------------------Import depuis Accueil-sans-coloc --------------------------------------------------------------------------
  findcoloc(nomColoc): void {
    if (nomColoc == null || nomColoc == "") {
      this.colocation=this.listeColoc; // réinitialisation de la liste à l'ensemble des valeurs
    }
    else {
      this.http.post('http://localhost:8085/getColocByNomColoc', nomColoc).subscribe({
        next: (data) => {
          this.colocation = data;
          if (this.colocation == null) {
            this.msg = "Aucune coloc trouvée";
          }
        },
        error: (err) => {
          this.msg = "Erreur";
          console.log(err)
        }
      });
    }
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
