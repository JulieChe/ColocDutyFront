
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheService } from '../services/authe.service';
import { ColocService } from '../services/coloc.service';
import { LienbackService } from '../services/lienback.service';

@Component({
  selector: 'app-creation-coloc',
  templateUrl: './creation-coloc.component.html',
  styleUrls: ['./creation-coloc.component.css']
})
export class CreationColocComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private authe: AutheService, private serviceColoc: ColocService, private lien: LienbackService) { }


  msg = null;
  coloc;
  currentUser;
  idUser;
  idColocbyUser;
  message;



  ngOnInit(): void {
    this.currentUser = this.authe.getUserCo();

    this.idUser=this.currentUser.idUser;
  }

 
  colocCreate(coloc, idUser): void {
    this.http.post(this.lien.lien+'savecoloc/' + idUser, coloc).subscribe({
      next: (data) => {
        this.coloc = data;
        console.log(this.coloc);
        if(this.coloc.adresse==null){
          alert("Vous avez déjà une colocation");
        }else{
          alert("colocation créée");
          this.currentUser.coloc = this.coloc;
          this.authe.saveUserCo(this.currentUser);
        }

        this.serviceColoc.scoloc = this.coloc.idColoc;
        console.log(this.serviceColoc.scoloc);
        this.router.navigateByUrl('/macoloc');

      },
    
      error: (err) => console.log(err)
    });
  }

 
  

  toutCreate(value) {
    //console.log('debut',value);
   
    const adresse ={
      numVoie: value.numVoie,
      nomRue: value.nomRue,
      ville: value.ville,
      codePostal:value.codePostal
    }

    const coloc = {
      nomColoc: value.nomColoc,
      descColoc: value.descColoc,
      capacite: value.capacite,
      loyer: value.loyer,
      isPublic: value.isPublic,
      adresse: adresse
    }
   

    this.currentUser = this.authe.getUserCo();
    //this.idUser =10;
    
    this.colocCreate(coloc, this.idUser);



  }

  retourAccueil(): void {
    if (this.currentUser.coloc != null){
      this.router.navigateByUrl('/macoloc');
    } else {
      this.router.navigateByUrl('/accueilSansColoc');
    }
  }

  

}



