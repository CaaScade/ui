import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as Chart from 'chart.js';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  chartData = {
    labels: ['Failures', 'Successes'],
    datasets: [{
      label: '',
      data: [1, 2],
      backgroundColor: ['#ff7043', '#5c6bc0']
    }]
  };

  @Input()
  set chartDetails(val) {
    this.chartData.datasets[0].data = [val.Failures, val.Successes];
    this.MyChart(this.chartData);
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
        type: 'pie',
        data: chartData,
        options: {
          legend: false,
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: false,
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
}
