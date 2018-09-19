import {Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';
import * as Chart from 'chart.js';
import {isNullOrUndefined} from 'util';
import { environment } from '../../../environments/environment';

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
      // fill: true,
      // backgroundColor: '',
      // borderColor: '#8547ea',
      // radius: 0,
      // borderWidth: 1,
      // strokeColor : '#2e30af',
      // pointColor : '#8547ea',
      // pointStrokeColor : '#2e30af',
      // pointHighlightFill: '#8547ea',
      // pointHighlightStroke: '#2e30af',
      // lineTension: 0.4,
      fill: false,
      borderColor: '#f99960',
      radius: 6,
      pointBackgroundColor : '#2e30af',
      pointBorderColor : '#fcfdfe',
      borderJoinStyle: 'bevel',
      borderWidth: 2,
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
      // const gradient = ctx.createLinearGradient(0, 0, 0, 50);
      // // gradient.addColorStop(0, '#2e30af');
      // // gradient.addColorStop(1, '#8547ea');
      // gradient.addColorStop(0, 'rgba(46,48,175,1)');
      // gradient.addColorStop(1, 'rgba(73,71,234,0)');
      // chartData.datasets[0].backgroundColor = gradient;

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
          layout: {
            padding: {
              right: 10,
              left: 10,
              bottom: 10
            }
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
