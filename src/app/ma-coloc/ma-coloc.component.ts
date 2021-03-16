import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AutheService } from '../services/authe.service';
import { ColocService } from '../services/coloc.service';

@Component({
  selector: 'app-ma-coloc',
  templateUrl: './ma-coloc.component.html',
  styleUrls: ['./ma-coloc.component.css']
})
export class MaColocComponent implements OnInit {

  constructor(private http: HttpClient, private coloc: ColocService, private authe:AutheService) {   }



user=this.authe.getUserCo();


colocActuelle=this.user.coloc;

taches;

habitants;
  ngOnInit(): void {

<<<<<<< HEAD


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


=======
    this.getColoc(this.coloc.scoloc);
    console.log('Coloc Actuelle : ' + this.colocActuelle)
  }

  getColoc(idColoc): void {
    this.http.post('http://localhost:8085/getColoc',idColoc).subscribe({
      next: (data) => { this.colocActuelle = data ;
        console.log('data ', data)
     },
      error: (err) => {
        console.log(err);
      }
    })
>>>>>>> 9d5a67c986de2e09b25e21b436e15a820d131909
  }

}
