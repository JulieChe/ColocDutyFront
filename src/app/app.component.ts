import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'colocDuty';
  idUser = 0;
  visible;
  user;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  cacherAff(idUser): boolean {
    if (localStorage.getItem('user') != null) {
      this.visible = true;
    }
    else {
      this.visible = false;
    }
    return this.visible
  }

  redirectionColoc() {
    this.user = JSON.parse(localStorage.getItem('user'));  
    console.log("le user est ",this.user)
    console.log("sa coloc est ",this.user.idUser)
    if (this.user.coloc != null) {
      this.router.navigateByUrl('/macoloc');
    } else {
      this.router.navigateByUrl('/accueilSansColoc');
    }

  }



}
