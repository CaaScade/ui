import {Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';
import * as Chart from 'chart.js';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit {
  @Input() applicationname: any;
  @ViewChild('chartCanvas') canvas: ElementRef;

  chartData = {
    labels: [],
    datasets: [{
      label: '',
      data: [],
      lineTension: 0,
      fill: true,
      backgroundColor: 'rgba(28, 186, 188, 0.20)',
      borderColor: 'green',
      radius: 0,
      borderWidth: 1
    }]
  };

  reputationChart: any;


  constructor() {
  }

  ngOnInit() {
    this.initializeSocket();
  }

  MyChart(chartData) {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (isNullOrUndefined(this.reputationChart)) {

      const config = {
        type: 'line',
        data: chartData,
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
              display: true,
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
      this.reputationChart.data = chartData;
      this.reputationChart.update();
    }
  }

  initializeSocket() {
    const socket = new WebSocket(`ws://localhost:8080/stats/${this.applicationname.toLowerCase()}`);
    this.chartData.datasets[0].label = this.applicationname;

    socket.onmessage = (res) => {
      const health = JSON.parse(res.data).spec.overallHealthPercentage;

      if (this.chartData.datasets[0].data.length === 10) {
        this.chartData.datasets[0].data.shift();
        this.chartData.labels.shift();
      }

      this.chartData.datasets[0].data.push(health);
      this.chartData.labels.push('');


      this.MyChart(this.chartData);
    };
  }


}
