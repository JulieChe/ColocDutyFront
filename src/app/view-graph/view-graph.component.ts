import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;

@Component({
  selector: 'app-view-graph',
  templateUrl: './view-graph.component.html',
  styleUrls: ['./view-graph.component.css']
})
export class ViewGraphComponent implements OnInit {
  public options: any = {
    Chart: {
      plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
      type: 'pie'
    },
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
    }
},
    
    series: [{
      name: 'Brands',
      colorByPoint: true,

      data: [{
        name: 'NomDuColoc1',
            y: 50,
            sliced: true,
            selected: true
      }, {
        name: 'NomDuColoc2',
            y: 40
      }, {
        name: 'NomDuColoc3',
        y: 90
      }]
    }]
  }

  constructor() { }

  ngOnInit() {
    Highcharts.chart('container', this.options);
  }

}