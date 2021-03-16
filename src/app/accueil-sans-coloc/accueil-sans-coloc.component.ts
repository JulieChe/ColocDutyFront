import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-accueil-sans-coloc',
  templateUrl: './accueil-sans-coloc.component.html',
  styleUrls: ['./accueil-sans-coloc.component.css']
})
export class AccueilSansColocComponent implements OnInit {

  coloc;
  id;
  msg;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  // checkColoc(coloc): any {

  //   if (this.coloc === null) {
  //     console.log('no coloc', this.authe.x);
  //   } else {
  //     this.authe.saveColoc(this.coloc);
  //     this.router.navigateByUrl('/test');
  //   }

  // }

  findcoloc(idColoc): void {
    
    this.http.post('http://localhost:8085/idColoc_ok', idColoc).subscribe({
      next: (data) => {
        this.coloc = data;
        if (this.coloc !== null) {
          this.id = this.coloc.idColoc;
          console.log("la valeur de id est ", this.id)
          this.router.navigateByUrl('/public-coloc');

        } else {
          this.msg = "Attention, le numéro que vous avez demandé n'est pas attribué ! Réessayez !"
        }

        // this.checkColoc(this.coloc);
        
      },
      error: (err) => console.log(err)
    });
  }

}
