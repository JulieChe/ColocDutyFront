import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AutheService } from '../services/authe.service';
import { LienbackService } from '../services/lienback.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  login;
  password;
  user;
  id;
  idColoc = null ;
  msg;
  visible;


  constructor(private http: HttpClient, private router: Router, private authe: AutheService, private lien: LienbackService) {

  }

  ngOnInit(): void {

  }

  getLogin(login): any {
    this.login = login;
  }

  getPassword(password): any {
    this.password = password;
  }

  checkCo(user): any {

    if (user === null) {
      console.log('no connect', this.authe.x);
    } else {
      this.authe.saveUserCo(this.user);
      this.router.navigateByUrl('/accueilSansColoc');
    }
  }

  cacherAff(user): boolean {
    if (this.authe.getUserCo() != null) {
      this.visible = false;
    }
    else {
      this.visible = true;
    }
    return this.visible;
  }

  connect(user): void {
    // console.log('afficher le user ', user);
    this.http.post(this.lien.lien +'connexion_ok', user).subscribe({
      next: (data) => {
        if (data == null){
          this.msg = "Login ou password incorrect"
        } else {
            this.user = data;
            console.log(data)
            this.checkCo(this.user);
            if (this.user.coloc != null) {
              this.router.navigateByUrl('/macoloc');
            } else {
              this.router.navigateByUrl('/accueilSansColoc');
          }
        }
        
      },
      error: (err) => console.log(err)
    });
  }

  getId(): void {
    this.http.get(this.lien.lien+'connexion').subscribe({
      next: (id) => { this.user.id = id; },
      error: (err) => { console.log(err); }
    });
  }

  goToInscription(): any {
    this.router.navigateByUrl('/inscription');

  }
}
