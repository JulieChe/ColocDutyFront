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
    this.user = localStorage.getItem('user');
    if (this.user.coloc != null) {
      this.router.navigateByUrl('/macoloc');
    } else {
      this.router.navigateByUrl('/accueilSansColoc');
    }

  }



}
