import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColocService } from '../services/coloc.service';
import { AutheService } from '../services/authe.service';
import { Coloc } from '../model/Coloc';


@Component({
  selector: 'app-accueil-sans-coloc',
  templateUrl: './accueil-sans-coloc.component.html',
  styleUrls: ['./accueil-sans-coloc.component.css']
})
export class AccueilSansColocComponent implements OnInit {

  colocation;
  id;
  userId;
  msg;
  msgColoc;
  user;
  currentUser;
  currentColoc;

  userConnecter;
  constructor(private http: HttpClient, private router: Router, private coloc: ColocService, private authe: AutheService) { }

  ngOnInit(): void {
    this.currentUser = this.authe.getUserCo();          // Attention il est important de garder deux variables d'utilisateur connecté
    this.userConnecter = this.authe.getUserCo();
  }

  rejoindreColoc(value) {
    this.userId = this.currentUser.idUser;
    this.http.post('http://localhost:8085/getColoc', value.idcoloc, {responseType: 'text'}).subscribe({
      next: (data) => { this.currentColoc = data ; console.log("coloc dans le get coloc", this.currentColoc)},
      error: (err) => console.log(err)
    });
    this.currentUser.coloc = this.currentColoc; 
    console.log("current user est : ", this.currentUser)
    this.http.put('http://localhost:8085/user/' + this.userId, this.currentUser).subscribe({
      next: (data) => { console.log("dans data il y a ", data) },
      error: (err) => console.log(err)
    });


    // this.http.post('/affecterColoc/{userId}', this.currentColoc).subscribe({
    //   next: (data) => {console.log("ca a marché")} ,
    //   error: (err) => console.log(err)
    // });


  }

  userRetour;
  //création condition IF

  tocColoc(value) {
    // let coloc = {idColoc: value.idColoc}
    let coloc: Coloc = new Coloc();
     coloc.idColoc = value.idColoc;
     this.userConnecter.coloc = coloc;

    


    // console.log('user avec coloc', this.userConnecter);

     this.http.put('http://localhost:8085/user/' + this.userConnecter.idUser, this.userConnecter).subscribe({
      next: (data) => { 
        this.userRetour = data ;  
        if (this.userRetour.coloc.nomColoc != null){
          this.msgColoc = null; 
          this.router.navigateByUrl('/macoloc');
        } else {
          this.msgColoc = "Erreur, cette colocation n'existe pas. Veuillez réessayer";
        }
      
      },
      error: (err) => console.log(err)
     });
  }


//-----------------------------------------------------------------Ajout Victor --------------------------------------------------------------------------

  findcoloc(idColoc): void {

    this.http.post('http://localhost:8085/idColoc_ok', idColoc).subscribe({
      next: (data) => {
        this.colocation = data;
        if (this.colocation !== null) {
          this.id = this.colocation.idColoc;
          console.log("la valeur de id est ", this.id)
          //integration du service
          this.coloc.scoloc = this.id;
          console.log("la valeur enregistré est : ", this.id)
          this.router.navigateByUrl('/public-coloc');
        } else {
          this.msg = "Attention, le numéro que vous avez demandé n'est pas attribué ! Réessayez !"
        }
      },
      error: (err) => console.log(err)
    });
  }

  redirectionToExploration():void{
    this.router.navigateByUrl('/exploration');

  }

  redirectionToCreationColoc():void{
    this.router.navigateByUrl('/creationColoc');

  }


  //----------------------------------------------------------------- Fin Ajout Victor --------------------------------------------------------------------------

}

