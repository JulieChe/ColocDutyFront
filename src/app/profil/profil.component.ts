import { Component, OnInit } from '@angular/core';
import { AutheService } from '../services/authe.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router, private authe: AutheService) { }
  
  pseudo;
  email;
  txt;
  msg; 
  etoiles;
  nomColoc; 
  visible;
  nbEtoiles;
  nbEtoilesPercent;
  nbEtoilesColoc;
  imgURL; 
  ok; 

user=this.authe.getUserCo();
colocActuelle=this.user.coloc;
taches;
tachesUser;
selectedFile; 

userCon;
  ngOnInit(): void {
    this.getPseudo();
    this.getTachesColoc();
    this.getEtoiles();
    this.getEtoilesColoc();
    this.getTachesUser();
    this.getEtoilesPercent();
    console.log('id User : '+ this.user.idUser);
    this.userCon = this.authe.getUserCo();
  }

  public getPseudo() {
    this.user = this.authe.getUserCo();
    this.pseudo = this.user.pseudo;
    this.email = this.user.email;
    this.nomColoc=this.user.coloc.nomColoc;
  }

  

  public deconnexion(){
    this.authe.deconnectUser();
    this.router.navigateByUrl('/connexion');
  }

  redirectionColoc(){
    this.user = this.authe.getUserCo(); 
    if(this.user.coloc != null){
      this.router.navigateByUrl('/macoloc');
    } else {
      this.msg = "Vous n'avez pas encore de colocation ! Trouvez-en une en recherchant"
    }
  }

  getTachesColoc(): void {
    this.http.post('http://localhost:8085/getTachesColoc',this.colocActuelle.idColoc).subscribe({
    next:(data) => {this.taches=data;
    console.log(this.taches)
 
  },
    error:(err)=>{console.log(err)}
    

    });
  }

  getTachesUser(): void {
    this.http.post('http://localhost:8085/getTachesUser',this.user.idUser).subscribe({
    next:(data) => {this.tachesUser=data;
    console.log(this.tachesUser)
 
  },
    error:(err)=>{console.log(err)}
    

    });
  }


  getEtoiles(): void {
    this.http.post('http://localhost:8085/getEtoilesUser',this.user.idUser).subscribe({
    next:(data) => {this.nbEtoiles=data;
    console.log('nb etoiles user' + this.nbEtoiles)
 
  },
    error:(err)=>{console.log(err)}
    

    });
  }

  getEtoilesColoc(): void {
    this.http.post('http://localhost:8085/getEtoilesColoc',this.colocActuelle.idColoc).subscribe({
    next:(data) => {this.nbEtoilesColoc=data;
    console.log('nb etoiles coloc = ' + this.nbEtoilesColoc)
    
  },
    error:(err)=>{console.log(err)}
    
    });
  }
 
  public getEtoilesPercent() {
    this.http.post('http://localhost:8085/getEtoilesPercent',this.user.idUser).subscribe({
      next:(data) => {this.nbEtoilesPercent=data;
 
        console.log('WSH LA TEAM ' + this.nbEtoilesPercent)
      },
      error:(err)=>{console.log(err)}
    });
  }

  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event2) => {
      this.imgURL = reader.result;
      this.ok = reader.result;
    };
  }

  imageS;
  uploadImage(){
    if(this.ok != null){
      this.imageS = window.btoa(this.ok);

      this.userCon.image = this.imageS;
    }

    this.http.put('http://localhost:8085/modifuser/' + this.user.idUser, this.userCon).subscribe({
      next:(data) => {this.imgURL = null;
      
   
    },
      error:(err)=>{console.log(err)}
      
  
      });
  }

  
  changeImForm(img) {
    return window.atob(img);
  }
  imageExist(img) {
    if (img == null) {
      return false;
    } else {
      return true;
    }

  }

  }

