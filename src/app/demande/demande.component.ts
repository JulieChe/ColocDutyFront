import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheService } from '../services/authe.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  demandes;
  demandesNL;
  demandesL;

  constructor(private http: HttpClient, private router: Router, private authe: AutheService) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8085/demandes').subscribe({
      next: (data) => {
        this.demandes = data;
        console.log('les demandes : ', this.demandes);
        console.log('une demande : ', this.demandes[0]);
      },
      error: (err) => { console.log(err); }
    });

   // this.demandesTri(this.demandes);

  }



  // demandesTri(demandes): void {
  //   console.log('tri des demandes');
  //   for (let i=0; i<demandes.length; i++){

  //     if (demandes[i].i_desc.lu === false){
  //       this.demandesNL = this.demandesNL.concat(demandes[i].i_desc);
  //       console.log('demandes non lues', this.demandesNL);
  //     }
  //     else {
  //       this.demandesL = this.demandesL.concat(demandes[i].i_desc);
  //       console.log('demandes lues', this.demandesL);
  //     }
  //   }
  // }





}
