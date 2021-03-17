import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheService } from '../services/authe.service';
import { ColocService } from '../services/coloc.service';

@Component({
  selector: 'app-mur',
  templateUrl: './mur.component.html',
  styleUrls: ['./mur.component.css']
})
export class MurComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private authe: AutheService, private coloc: ColocService) { }

  ngOnInit(): void {
    this.currentUser = this.authe.getUserCo();
    this.getMursColoc()
  }

  murs;
  currentUser; 

  public getMursColoc() {
    console.log("id coloc", this.currentUser.coloc.idColoc)
    this.http.get('http://localhost:8085/murs', this.currentUser.coloc.idColoc).subscribe({
      next: (data) => {
        this.murs = data;
        console.log(this.murs)
      },
      error: (err) => { console.log(err) }
    });
  }

  retour(): void {
    this.router.navigateByUrl('/macoloc');
  }

}
