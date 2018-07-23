import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {isNullOrUndefined} from 'util';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-multi-line-chart',
  templateUrl: './multi-line-chart.component.html',
  styleUrls: ['./multi-line-chart.component.css']
})
export class MultiLineChartComponent implements OnInit {
  @Input() isSystemStats: Boolean;

  @Input()
  set chartDetails(data) {
    if ( data && !this.isSystemStats) {
      this.MyChart(data);
    } else {
      if (data) {
        this.MySystemStatsChart(data);
      }
    }
  }


  @ViewChild('chartCanvas') canvas: ElementRef;


  reputationChart: any;
  colorCodes = ['#008FFF', '#D59900', '#66D500', '#00BBD5', '#D500D5', '#FF7A00', '#FF4646',
    '#616161',
    '#E54028',
    '#1CBABC',
    '#01A4A4',
    '#D0D102',
    '#CE5973',
    '#4B4934',
    '#ED1D24'
  ];

  constructor() {
  }

  ngOnInit() {
  }

  MyChart(chartData) {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const chartPoints = [];
    for (let i = 0; i < chartData.data.length; i++) {
      const cd = {
        label: '',
        data: chartData.data[i],
        lineTension: 0,
        fill: true,
        backgroundColor: this.hexToRgbA(this.colorCodes[i]),
        borderColor: this.colorCodes[i],
        radius: 0,
        borderWidth: 1,
      };
      chartPoints.push(cd);

    }
    if (isNullOrUndefined(this.reputationChart)) {

      const config = {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: chartPoints
        },
        options: {
          legend: false,
          responsive: true,
          tooltips: {
            enabled: false,
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: false
          },
          scales: {
            xAxes: [{
              display: false,
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: ''
              }
            }],
            yAxes: [{
              display: false,
              position: 'left',
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: false,
                labelString: ''
              }
            }]
          }
        }
      };

      this.reputationChart = new Chart(ctx, config);
    } else {
      this.reputationChart.update();
      this.reputationChart.data.labels = chartData.labels;
      this.reputationChart.data.datasets[0].data = chartData.data[0];
      this.reputationChart.data.datasets[1].data = chartData.data[1];
      this.reputationChart.update();
    }
  }

  MySystemStatsChart(chartData) {
    const ctx = this.canvas.nativeElement.getContext('2d');

    if (isNullOrUndefined(this.reputationChart)) {

      const config = {
        type: 'line',
        data: {
          labels: [chartData.labels],
          datasets: [{
            label: '',
            data: [Number(chartData.data[0])],
            lineTension: 0,
            fill: true,
            backgroundColor: this.hexToRgbA(this.colorCodes[0]),
            borderColor: this.colorCodes[0],
            radius: 0,
            borderWidth: 1,
          }]
        },
        options: {
          legend: false,
          responsive: true,
          tooltips: {
            enabled: true,
            mode: 'index',
            intersect: true,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: false,
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: ''
              }
            }],
            yAxes: [{
              display: false,
              position: 'left',
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: false,
                labelString: ''
              }
            }]
          }
        }
      };

      this.reputationChart = new Chart(ctx, config);
    } else {
      this.reputationChart.update();
      this.reputationChart.data.labels.push(chartData.labels);
      this.reputationChart.data.datasets[0].data.push(Number(chartData.data[0]));
      this.reputationChart.update();
    }
  }

  private hexToRgbA(hex) {
    const  alpha = 0.2;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
      return `rgba(${r}, ${g}, ${b})`;
    }
  }


}
