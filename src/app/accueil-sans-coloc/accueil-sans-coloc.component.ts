import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-accueil-sans-coloc',
  templateUrl: './accueil-sans-coloc.component.html',
  styleUrls: ['./accueil-sans-coloc.component.css']
})
export class AccueilSansColocComponent implements OnInit {

  idColoc

  constructor(private http: HttpClient) { }

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
    console.log('afficher la coloc ', idColoc);
    this.http.post('http://localhost:8085/idColoc_ok', idColoc).subscribe({
      next: (data) => {
        this.idColoc = data;
        // this.checkColoc(this.coloc);
      },
      error: (err) => console.log(err)
    });
  }

}
