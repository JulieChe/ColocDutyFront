
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creation-coloc',
  templateUrl: './creation-coloc.component.html',
  styleUrls: ['./creation-coloc.component.css']
})
export class CreationColocComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router ) { }


  msg = null;


  ngOnInit(): void {
  }


  // adresseCreate(adresse): void {
  //   this.http.post('http://localhost:8085/saveAdresse', adresse).subscribe(() => {
  //     console.log('Adresse créée');
  //   })
  // }

  colocCreate(coloc): void {
    this.http.post('http://localhost:8085/savecoloc', coloc).subscribe(() => {
      console.log('coloc créée');

    }, err => {
      // L'utilisateur n'a pas été créé on affiche un message d'erreur
      console.log('erreur création de coloc' + err);
    });
  }


  toutCreate(value) {
    console.log("debut",value);
   
    const adresse ={
      numVoie: value.numVoie,
      nomRue: value.nomRue,
      ville: value.ville,
     codePostal:value.codePostal
    }


    // this.adresse.numVoie = value.numVoie;
    // this.adresse.nomRue = value.nomRue;
    // this.adresse.ville = value.ville;

    const coloc = {
      nomColoc: value.nomColoc,
      descColoc: value.descColoc,
      capacite: value.capacite,
      loyer: value.loyer,
      public: value.public,
      adresse: adresse
    }
    
    
    console.log("fin",coloc);

    // this.adresseCreate(this.adresse);
    this.colocCreate(coloc);

    this.router.navigateByUrl('/accueil')


  }
}


//   userCreate(user): void {

//       this.http.post('http://localhost:8085/saveuser', user).subscribe(() => {
//         // On a créé l'utilisateur, on retourne sur la page de connexion
//         console.log('user créé');
//         this.msg = 'Utilisateur créé';
//        err => {
//         // L'utilisateur n'a pas été créé on affiche un message d'erreur
//         console.log('erreur création user' + err);
//         this.msg = 'Erreur création du nouvel utilisateur !';
//       });
//     } else {
//       this.msg = 'Les mots de passe sont différents !';
//       console.log('Attention, les mdp sont différents');
//     }
//   }

// }

