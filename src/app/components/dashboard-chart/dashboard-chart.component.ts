import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {isNullOrUndefined} from "util";
import {environment} from '../../../environments/environment';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss']
})
export class DashboardChartComponent implements OnInit {

  @Input() applicationname: any;
  @ViewChild('chartCanvas') canvas: ElementRef;

  chartData = {
    labels: [],
    datasets: [{
      label: 'Overall Health',
      data: [],
      lineTension: 0,
      fill: false,
      borderColor: '#f99960',
      radius: 6,
      pointBackgroundColor : '#2e30af',
      pointBorderColor : '#fcfdfe',
      borderJoinStyle: 'bevel',
      borderWidth: 1,
      pointBorderWidth: 4

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
              display: false,
              drawTicks: false,
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: false,
                labelString: 'Overall Health'
              }
            }],
            yAxes: [{
              display: true,
              position: 'left',
              gridLines: {
                drawTicks: true,
                display: true
              },
              ticks: {
                maxTicksLimit: 5
              },
              scaleLabel: {
                display: false,
                labelString: 'Time'
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
    const socket = new WebSocket(`ws://${environment.host}/stats/redis`);
    this.chartData.datasets[0].label = 'Overall Health';

    socket.onmessage = (res) => {
      const health = JSON.parse(res.data).spec.overallHealthPercentage;

      if (this.chartData.datasets[0].data.length === 40) {
        this.chartData.datasets[0].data.shift();
        this.chartData.labels.shift();
      }

      this.chartData.datasets[0].data.push(health);
      this.chartData.labels.push('');


      this.MyChart(this.chartData);
    };
  }



}
