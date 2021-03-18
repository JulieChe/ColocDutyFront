import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;

@Component({
  selector: 'app-view-graph',
  templateUrl: './view-graph.component.html',
  styleUrls: ['./view-graph.component.css']
})
export class ViewGraphComponent implements OnInit {
//   public options: any = {
//     Chart: {
//       plotBackgroundColor: null,
//         plotBorderWidth: null,
//         plotShadow: false,
//       type: 'pie'
//     },
//     title: {
//       text: ''
//     },
//     tooltip: {
//       pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//     },
//     accessibility: {
//       point: {
//           valueSuffix: '%'
//       }
//   },
//   plotOptions: {
//     pie: {
//         allowPointSelect: true,
//         cursor: 'pointer',
//         dataLabels: {
//             enabled: true,
//             format: '<b>{point.name}</b>: {point.percentage:.1f} %'
//         }
//     }
// },
    
//     series: [{
//       name: 'Brands',
//       colorByPoint: true,

//       data: [{
//         name: 'NomDuColoc1',
//             y: 50,
//             sliced: true,
//             selected: true
//       }, {
//         name: 'NomDuColoc2',
//             y: 40
//       }, {
//         name: 'NomDuColoc3',
//         y: 90
//       }]
//     }]
//   }

highcharts = Highcharts;
   chartOptions = {
      chart : {
         plotBorderWidth: null,
         plotShadow: false
      },
      title : {
         text: 'Browser market shares at a specific website, 2014'
      },
      tooltip : {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
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
      series : [{
         type: 'pie',
         name: 'Browser share',
         data: [
            ['Firefox',   45.0],
            ['IE',       26.8],
            {
               name: 'Chrome',
               y: 12.8,
               sliced: true,
               selected: true
            },
            ['Safari',    8.5],
            ['Opera',     6.2],
            ['Others',      0.7]
         ]
      }]
   };


  constructor() { }

  ngOnInit() {
    // Highcharts.chart('container', this.options);
  }

}