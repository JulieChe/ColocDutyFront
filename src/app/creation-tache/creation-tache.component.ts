import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutheService } from '../services/authe.service';

@Component({
  selector: 'app-creation-tache',
  templateUrl: './creation-tache.component.html',
  styleUrls: ['./creation-tache.component.css']
})
export class CreationTacheComponent implements OnInit {

  constructor(private http: HttpClient, private authe: AutheService) { }

  tache;
  idColoc;
  currentUser;
  idUser;

  ngOnInit(): void {
  }

  tacheCreate(tache): void {
    this.http.post('http://localhost:8085/savetache', tache).subscribe({
      next: (data) => {
        this.tache = data;
        this.tache.idColoc=this.idColoc;
        console.log(this.tache);
        
      },
    });
  }

  RecupIdColoc(idUser): void {
    this.http.post('http://localhost:8085/getidColocbyidUser',idUser).subscribe({
      next: (data2) => {
        this.idColoc = data2;
        console.log(this.idColoc);
      },
    });
  }

  tout(value) {

    const coloc = {
      nomTache: value.nomtache,
      nbEtoiles: value.nbEtoiles,
      date: value.date,
      frequence: value.frequence,
     
    }

    this.tacheCreate(this.tache);
    
    this.currentUser = this.authe.getUserCo();
    this.idUser =9;
    
    this.RecupIdColoc(this.idUser);
    
    }

}


