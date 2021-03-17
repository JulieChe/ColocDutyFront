import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AutheService } from '../services/authe.service';
import { ColocService } from '../services/coloc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ma-coloc',
  templateUrl: './ma-coloc.component.html',
  styleUrls: ['./ma-coloc.component.css']
})
export class MaColocComponent implements OnInit {

  constructor(private http: HttpClient, private coloc: ColocService, private authe:AutheService,private router: Router) {   }



user=this.authe.getUserCo();

msg;
colocActuelle=this.user.coloc;

taches;

tacheAjoutee;

habitants;
  ngOnInit(): void {



    console.log(this.colocActuelle.nomColoc);
    console.log(this.colocActuelle.descColoc);
    console.log(this.colocActuelle.loyer);
    console.log(this.colocActuelle.idColoc);
    console.log(this.user);
    
    this.getTachesColoc();
    this.gethabitants();
    
  }

  getTachesColoc(): void {
    this.http.post('http://localhost:8085/getTachesColoc',this.colocActuelle.idColoc).subscribe({
    next:(data) => {this.taches=data;
    console.log(this.taches)},
    error:(err)=>{console.log(err)}

    });
  }

  gethabitants():void{
    this.http.post('http://localhost:8085/getUsersByIdColoc',this.colocActuelle.idColoc).subscribe({
      next:(data) => {this.habitants=data;
      console.log(this.habitants)},
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
      this.http.post('http://localhost:8085/addTache',tache).subscribe(
      {
        next:(data) => {this.tacheAjoutee=data;
        console.log(this.tacheAjoutee)},
        error:(err)=>{console.log(err)},
        }
      )
      this.router.navigateByUrl('/macoloc'),
      console.log('redirect')
      }
  }

  attribuerUser(tache){
    tache.user = this.user;

    this.http.put('http://localhost:8085/updateTache/' + this.user.idUser, tache).subscribe(
      {
        next:(data) => {
        console.log(data)},
        error:(err)=>{console.log(err)}
    }
      
    )

  }

}
