import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheService } from '../services/authe.service';
import { ColocService } from '../services/coloc.service';
import { LienbackService } from '../services/lienback.service';

@Component({
  selector: 'app-mur',
  templateUrl: './mur.component.html',
  styleUrls: ['./mur.component.css']
})
export class MurComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private authe: AutheService, private coloc: ColocService, private lien: LienbackService) { }

  ngOnInit(): void {
    this.currentUser = this.authe.getUserCo();
    this.getMursColoc()
  }

  murs;
  msg;
  msg2
  currentUser;

  public getMursColoc() {
    console.log("id coloc", this.currentUser.coloc.idColoc)
    this.http.get(this.lien.lien+'mur/' + this.currentUser.coloc.idColoc).subscribe({
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

  public poster(mur) {
    mur.user = this.currentUser;
    mur.coloc = this.currentUser.coloc;
    console.log("afficher les infos du APRES", mur);
    this.http.post(this.lien.lien+'murPoster', mur).subscribe({
      next: (data) => {
        this.msg = "Votre commentaire a été ajouté !"
        this.ngOnInit();
      },
      error: (err) => { console.log(err); this.msg = "Erreur, veuillez recommencer"; this.ngOnInit }
    });

  }

  public supprimerMur(idMur) {
    console.log("idmur est", idMur)
    idMur = JSON.stringify(idMur);
    console.log("idmur STRINGIFY est", idMur)
    this.http.delete(this.lien.lien+'murDelete/' + idMur).subscribe({
      next: (data) => { this.msg2 = "Le commentaire a été supprimé !" ; this.ngOnInit() },
      error: (err) => { this.msg2 = "Erreur, veuillez recommencer" }
    });
  }

}
