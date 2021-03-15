import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AutheService } from '../services/authe.service';

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


  constructor(private http: HttpClient, private router: Router, private authe: AutheService) {

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
      this.router.navigateByUrl('/test');
    }

  }

  connect(user): void {
   // console.log('afficher le user ', user);
    this.http.post('http://localhost:8085/connexion_ok', user).subscribe({
      next: (data) => {
        this.user = data;
        this.checkCo(this.user);
      },
      error: (err) => console.log(err)
    });
  }

  getId(): void {
    this.http.get('http://localhost:8085/connexion').subscribe({
      next: (id) => { this.user.id = id; },
      error: (err) => { console.log(err); }
    });

  }
}
