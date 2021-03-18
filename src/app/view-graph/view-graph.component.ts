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

   highcharts = Highcharts;
   chartOptions = {
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
               format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
               style: {
                  color: Highcharts.theme || 'black'
               }
            }
         }
      },
      series: [{
         type: 'pie',
         name: 'Browser share',
         data: [
            ['Firefox', 45.0],
            ['IE', 26.8],
            {
               name: 'Chrome',
               y: 12.8,
               sliced: true,
               selected: true
            },
            ['Safari', 8.5],
            ['Opera', ],
            ['Others', 0.7]
         ]
      }]
   };

   constructor(private http: HttpClient, private router: Router, private authe: AutheService) { }
   nbEtoiles;
   nbEtoilesColoc;
   nbEtoilesPercent;
   user = this.authe.getUserCo();
   colocActuelle = this.user.coloc;
   membres;

   ngOnInit(): void {
      this.getEtoiles();
      this.getEtoilesColoc();
      this.getEtoilesPercent();
      this.getMembres();
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

   getMembres(){
      this.http.post('http://localhost:8085/getEtoilesUsers', this.colocActuelle.idColoc).subscribe({
         next: (data) => {
            this.membres = data;
            console.log('membres = ' + data);

         },
         error: (err) => { console.log(err) }
      });
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