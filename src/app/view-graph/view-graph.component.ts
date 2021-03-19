import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { AutheService } from '../services/authe.service';

declare var require: any;

@Component({
   selector: 'app-view-graph',
   templateUrl: './view-graph.component.html',
   styleUrls: ['./view-graph.component.css']
})
export class ViewGraphComponent implements OnInit {

   test =
      [
         {
            "idMembre": 18,
            "idUser": 6,
            "name": "Conan L'aventurier",
            "nbEtoiles": 0,
            "y": 12.0
         },
         {
            "idMembre": 19,
            "idUser": 7,
            "name": "Kangu Junior",
            "nbEtoiles": 0,
            "y": 6.0
         }
      ]

   defGraph() {

      console.log('Data members', this.data_membres)
      console.log('autre data_membres ', this.autre_data_membres);
      this.highcharts = Highcharts;
      this.chartOptions = {
         chart: {

            plotBorderWidth: null,
            plotShadow: false
         },
         title: {
            text: 'Répartition des taches'
         },
         tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
         },
         plotOptions: {
            pie: {
               allowPointSelect: true,
               cursor: 'pointer',
               dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  style: {
                     color: Highcharts.theme || 'black'
                  }
               }
            }
         },
         series: [{
            type: 'pie',
            name: 'Taches réalisées',
            data: this.membres
            // data : this.data_membres
         }]
      };
   }

   constructor(private http: HttpClient, private router: Router, private authe: AutheService) { }
   nbEtoiles;
   nbEtoilesColoc;
   nbEtoilesPercent;
   user = this.authe.getUserCo();
   colocActuelle = this.user.coloc;
   membres;
   ligne = [];
   highcharts;
   chartOptions;
   data_membres = [];
   autre_data_membres = [["kangou", 50], ["conan", 50]];

   ngOnInit(): void {
      this.getEtoiles();
      this.getEtoilesColoc();
      this.getEtoilesPercent();
      this.getMembres();
      const getMemberBis =  this.http.post('http://localhost:8085/getEtoilesUsers', this.colocActuelle.idColoc).toPromise();

      getMemberBis.then(data => {
         this.membres = data;
         this.defGraph();
      }, err => {
         console.log(err);
      } )
      
      // this.setDataMembres();
      // console.log('apres setDataMembres')
      // this.defGraph();

   }




   getEtoiles(): void {
      this.http.post('http://localhost:8085/getEtoilesUser', this.user.idUser).subscribe({
         next: (data) => {
            this.nbEtoiles = data;
            // console.log('nb etoiles user' + this.nbEtoiles);

         },
         error: (err) => { console.log(err) }
      });
   }

     
   

   getMembres() {
      this.http.post('http://localhost:8085/getEtoilesUsers', this.colocActuelle.idColoc).subscribe({
         next: (data) => {
            this.membres = data;
            // this.membres.forEach(m => {
            //    // console.log('membre',m)
            // });

            // this.membres.forEach(m => {

            //    this.ligne = [m.nom, m.pourcent];
            //    console.log(this.ligne)

            //    this.data_membres.push(this.ligne)

            //    // this.data_membres = [ligne1,ligne2,...]
            // });
            // // console.log(this.data_membres)

         },
         error: (err) => { console.log(err) }
      });
   }

   setDataMembres() {
      // console.log('membres dns setdata membres', this.membres)
      this.membres.forEach(m => {

         this.ligne = [m.nom, m.pourcent];
         this.data_membres.push(this.ligne)
      });
      // console.log(this.data_membres)
   }

   getEtoilesColoc(): void {
      this.http.post('http://localhost:8085/getEtoilesColoc', this.colocActuelle.idColoc).subscribe({
         next: (data) => {
            this.nbEtoilesColoc = data;
            // console.log('nb etoiles coloc = ' + this.nbEtoilesColoc);

         },
         error: (err) => { console.log(err) }
      });
   }

   public getEtoilesPercent() {
      this.http.post('http://localhost:8085/getEtoilesPercent', this.user.idUser).subscribe({
         next: (data) => {
            this.nbEtoilesPercent = data;
            //  console.log('Le pourcentage des tâches réalisées est de : ' + this.nbEtoilesPercent);
         },
         error: (err) => { console.log(err) }
      });
   }

}