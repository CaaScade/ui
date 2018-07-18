import { Component, OnInit } from '@angular/core';
import {ApiCallService} from '../../utils/http.service';
import * as guage from 'svg-gauge';
import {Urls} from '../../utils/urls';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ApiCallService]

})
export class DashboardComponent implements OnInit {

  applications: any = [];
  dashboard_overview: any = {};

  constructor(private callAPI: ApiCallService) {}

  ngOnInit() {
    this.callAPI.callGetAPI(Urls.BASE_URL + '/' + Urls.APPLICATION_BASE).subscribe(data => {
      this.applications = data;
    });

    this.callAPI.callGetAPI(Urls.BASE_URL + '/' + Urls.STATUS_BASE).subscribe(data => {
      this.dashboard_overview = data;
      this.createGuage(this.dashboard_overview.spec.overallHealthPercentage);
    });
  }

  createGuage(guageValue) {
    const cpuGauge = guage(document.getElementById('cpuSpeed'), {
      max: 100,
      // custom label renderer
      label: function(value) {
        return Math.round(value) + '%';
      },
      value: guageValue,
      // Custom dial colors (Optional)
      color: function(value) {
        if (value < 20) {
          return '#ef4655'; // green
        } else if (value < 40) {
          return '#f7aa38'; // yellow
        } else if (value < 60) {
          return '#fffa50'; // orange
        } else {
          return '#5ee432'; // red
        }
      }
    });
  }


}
