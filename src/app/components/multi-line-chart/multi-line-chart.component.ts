import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {isNullOrUndefined} from 'util';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-multi-line-chart',
  templateUrl: './multi-line-chart.component.html',
  styleUrls: ['./multi-line-chart.component.css']
})
export class MultiLineChartComponent implements OnInit {

  @Input()
  set chartDetails(data) {
    this.MyChart(data);
  }

  @ViewChild('chartCanvas') canvas: ElementRef;


  reputationChart: any;


  constructor() {
  }

  ngOnInit() {
  }

  MyChart(chartData) {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (isNullOrUndefined(this.reputationChart)) {

      const config = {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [{
            label: 'A1',
            data: chartData.data,
            lineTension: 0,
            fill: true,
            backgroundColor: 'rgba(28, 186, 188, 0.20)',
            borderColor: 'green',
            radius: 0,
            borderWidth: 1
          }]
        },
        options: {
          legend: false,
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: false,
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
      this.reputationChart.data.labels = chartData.labels;
      this.reputationChart.data.datasets[0].data = chartData.data;
      this.reputationChart.update();
    }
  }


}
