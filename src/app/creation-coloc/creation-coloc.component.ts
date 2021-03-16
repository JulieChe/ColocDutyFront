
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheService } from '../services/authe.service';

@Component({
  selector: 'app-creation-coloc',
  templateUrl: './creation-coloc.component.html',
  styleUrls: ['./creation-coloc.component.css']
})
export class CreationColocComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private authe: AutheService ) { }


  msg = null;
  coloc;
  currentUser;
  idUser;
  idColocbyUser;
  message;



  ngOnInit(): void {
  }


  // adresseCreate(adresse): void {
  //   this.http.post('http://localhost:8085/saveAdresse', adresse).subscribe(() => {
  //     console.log('Adresse créée');
  //   })
  // }
 
  colocCreate(coloc, idUser): void {
    this.http.post('http://localhost:8085/savecoloc/' + idUser, coloc).subscribe({
      next: (data) => {
        this.coloc = data;
        console.log(this.coloc);
        if(this.coloc.adresse==null){
          alert("Vous avez déjà une colocation");
        }else{
          alert("colocation créée")
        }
        
      },
    
      
    
      
      error: (err) => console.log(err)
    });
  }

  // idColoc(idUser){
  //   this.http.post('http://localhost:8085/getidColocbyidUser',idUser).subscribe({
  //     next: (data) => {
  //       this.idColocbyUser = data;
  //       console.log(this.idColocbyUser);
  //       if(this.idColocbyUser !=0){
  //         console.log('déjà créée');
  //         this.message="coloc déjà créée";
  //         alert(this.message);
  //         console.log("redirection")

  //       }else{console.log("colocation enregistrée");}
  //     },
  //     error: (err) => console.log(err)
  //   });
  // }
  

  toutCreate(value) {
    //console.log('debut',value);
   
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

   // console.log("fin",coloc);

    // this.adresseCreate(this.adresse);

   

    this.currentUser = this.authe.getUserCo();
    this.idUser =10;
    
    this.colocCreate(coloc, this.idUser);
   // this.idColoc(this.idUser);

    
   

  // this.router.navigateByUrl('/connexion')
   //console.log('redirection');




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

