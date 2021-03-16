import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColocService } from '../services/coloc.service';

@Component({
  selector: 'app-ma-coloc',
  templateUrl: './ma-coloc.component.html',
  styleUrls: ['./ma-coloc.component.css']
})
export class MaColocComponent implements OnInit {

  constructor(private http: HttpClient, private coloc: ColocService) {   }

colocActuelle

  ngOnInit(): void {

    this.getColoc(this.coloc.scoloc);
    console.log('Id de la Coloc Actuelle : ' + this.colocActuelle.nomColoc)
  }

  getColoc(idColoc): void {
    this.http.post('http://localhost:8085/getColoc',idColoc).subscribe({
      next: (data) => { this.colocActuelle = data 
     },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
