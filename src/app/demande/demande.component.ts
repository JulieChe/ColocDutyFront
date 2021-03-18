import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheService } from '../services/authe.service';
import { ColocService } from '../services/coloc.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  user;
  demandes;
  demandesNonLues;
  demandesLues;
  colocActuelle;
  demande;
  visibleL = false;
  visibleNL = false;

  constructor(private http: HttpClient, private router: Router,private authe: AutheService) { }

  ngOnInit(): void {
    this.user = this.authe.getUserCo();
    this.colocActuelle = this.user.coloc;
    this.demandesNL();
    this.demandesL();
  }

  demandesNL(): void {
    this.http.post('http://localhost:8085/demandesNL', this.colocActuelle.idColoc).subscribe({
      next: (data) => {
        this.demandesNonLues = data;
        console.log('les demandes non lues: ', this.demandesNonLues);
        console.log('une demande non lue: ', this.demandesNonLues[0]);
      },
      error: (err) => { console.log(err); }
    });

  }

  demandesL(): void {
    this.http.post('http://localhost:8085/demandesL', this.colocActuelle.idColoc).subscribe({
      next: (data) => {
        this.demandesLues = data;
        console.log('les demandes lues: ', this.demandesLues);
        console.log('une demande lue: ', this.demandesLues[0]);
      },
      error: (err) => { console.log(err); }
    });

  }

  cacherAffL(): boolean {
    if(this.demandesLues.length === 0){
      this.visibleL = true;
    }
    else {
      this.visibleL = false;
    }
    return this.visibleL;
  }

  cacherAffNL(): boolean {
    if(this.demandesNonLues.length === 0){
      this.visibleNL = true;
    }
    else {
      this.visibleNL = false;
    }
    return this.visibleNL;
  }


  marqLu(demande): void {
    this.http.put('http://localhost:8085/marqLu', demande).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.ngOnInit();
        },
        error: (err) => { console.log(err);}
      }
    )
  }

  marqNLu(demande): void {
    this.http.put('http://localhost:8085/marqNLu', demande).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.ngOnInit();
        },
        error: (err) => { console.log(err);}
      }
    )
  }

  retour(): void {
    this.router.navigateByUrl('/macoloc');
  }

}
