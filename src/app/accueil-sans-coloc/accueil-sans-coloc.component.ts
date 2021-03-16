import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColocService } from '../services/coloc.service';


@Component({
  selector: 'app-accueil-sans-coloc',
  templateUrl: './accueil-sans-coloc.component.html',
  styleUrls: ['./accueil-sans-coloc.component.css']
})
export class AccueilSansColocComponent implements OnInit {

  colocation;
  id;
  msg;
  constructor(private http: HttpClient, private router: Router, private coloc: ColocService) { }

  ngOnInit(): void {
  }

  findcoloc(idColoc): void {
    
    this.http.post('http://localhost:8085/idColoc_ok', idColoc).subscribe({
      next: (data) => {
        this.colocation = data;
        if (this.colocation !== null) {
          this.id = this.colocation.idColoc;
          console.log("la valeur de id est ", this.id)
          //integration du service
          this.coloc.scoloc=this.id;
          console.log("la valeur enregistré est : ", this.id)
          this.router.navigateByUrl('/macoloc');
        } else {
          this.msg = "Attention, le numéro que vous avez demandé n'est pas attribué ! Réessayez !"
        }   
      },
      error: (err) => console.log(err)
    });
  }
  
  
}

