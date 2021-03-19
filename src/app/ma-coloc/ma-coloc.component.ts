import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AutheService } from '../services/authe.service';
import { ColocService } from '../services/coloc.service';
import { Router } from '@angular/router';
import { LienbackService } from '../services/lienback.service';

@Component({
  selector: 'app-ma-coloc',
  templateUrl: './ma-coloc.component.html',
  styleUrls: ['./ma-coloc.component.css']
})
export class MaColocComponent implements OnInit {

  constructor(private http: HttpClient, private coloc: ColocService, private authe:AutheService,private router: Router, private lien: LienbackService) {   }



user;

msg;
colocActuelle;

taches;
nbTachesNonFaites;
tacheAjoutee;
nbDemandesNL;
habitants;
  ngOnInit(): void {

    this.user=this.authe.getUserCo();
    this.colocActuelle=this.user.coloc;

    // console.log(this.colocActuelle.nomColoc);
    // console.log(this.colocActuelle.descColoc);
    // console.log(this.colocActuelle.loyer);
    // console.log(this.colocActuelle.idColoc);
    // console.log(this.user);
    
    this.getTachesColoc();
    this.gethabitants();
    this.getNbDemandesNL();
    
  }


  getNbDemandesNL(){
    this.http.post(this.lien.lien+'nbDemandesNL',this.colocActuelle.idColoc).subscribe({
      next:(data)=>{
        this.nbDemandesNL = data;
      }
  })
}

  getTachesColoc(): void {
    this.http.post(this.lien.lien+'getTachesColoc',this.colocActuelle.idColoc).subscribe({
    next:(data) => {this.taches=data;
    console.log(this.taches)
    this.tachesNonFaites();
  },
    error:(err)=>{console.log(err)}

    });
  }

  gethabitants():void{
    this.http.post(this.lien.lien+'getUsersByIdColoc',this.colocActuelle.idColoc).subscribe({
      next:(data) => {this.habitants=data;
      // console.log(this.habitants)
    },
      error:(err)=>{console.log(err)}
  
      });
  }

  addTache(tache):void{
    tache.coloc = this.colocActuelle;
    if (tache.frequence == ""){
      this.msg = "Veuillez indiquer une frequence";
    } else if(tache.nomTache == ""){
      this.msg = "Veuillez indiquer un nom à cette tache";
    } else if(tache.nbEtoiles == 0){
      this.msg = "Veuillez indiquer une valeur à cette tache";
    } else {
      this.http.post(this.lien.lien+'addTache',tache).subscribe(
      {
        next:(data) => {this.tacheAjoutee=data;
        // console.log(this.tacheAjoutee)
        this.ngOnInit();
      },
        error:(err)=>{console.log(err)},
        }
      )
      this.router.navigateByUrl('/macoloc')
      // console.log('redirect')
      }
  }

  attribuerUser(tache){
    tache.user = this.user;

    this.http.put(this.lien.lien+'updateTache/' + this.user.idUser, tache).subscribe(
      {
        next:(data) => {
        // console.log(data)
      },
        error:(err)=>{console.log(err)}
    }
      
    )

  }

  resetTache(){
    this.http.put(this.lien.lien+'resetTache',this.colocActuelle).subscribe(
      {
        next:(data) => {
        // console.log(data)
      },
        error:(err)=>{console.log(err)}
    }
      
    )
  }

  tachesNonFaites(){
    this.nbTachesNonFaites = 0;
      this.taches.forEach(t => {
        if (t.user == null){
          this.nbTachesNonFaites++;
        }
        
      });

  }

  quitterColoc(){
    this.http.put(this.lien.lien+'quitterColoc',this.user.idUser).subscribe(
      {
        next:(data) => {
        this.authe.saveUserCo(data)
        console.log(this.user);


        this.router.navigateByUrl('/accueilSansColoc')
      },
        error:(err)=>{console.log(err)}
    }
      
    )

  }

}
