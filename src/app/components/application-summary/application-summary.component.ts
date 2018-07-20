import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {Urls} from '../../utils/urls';
import {ApiCallService} from '../../utils/http.service';

@Component({
  selector: 'app-application-summary',
  templateUrl: './application-summary.component.html',
  styleUrls: ['./application-summary.component.scss'],
  providers: [ApiCallService]
})
export class ApplicationSummaryComponent implements OnInit {

  activeApplicationData: any;
  healthDashboardData: any;
  mttrChartData: any;
  mttdChartData: any;
  incidentChartData: any;
  applications_event: any;


  constructor(public activeRouter: ActivatedRoute, private callAPI: ApiCallService, @Inject(LOCALE_ID) private locale: string) {

    this.activeRouter.params.subscribe(data => {
      this.get_application_data(data.application_name);
      this.get_health_dashboard_data(data.application_name);

    });

  }

  ngOnInit() {
  }

  get_application_data(application_name) {
    this.callAPI.callGetAPI(Urls.BASE_URL + '/' + Urls.APPLICATION_BASE + `/${application_name.toLowerCase()}`).subscribe(data => {
      this.activeApplicationData = data;
    });
  }


  get_health_dashboard_data(application_name) {
    const socket = new WebSocket(`ws://localhost:8080/stats/${application_name.toLowerCase()}/health-dashboard`);

    socket.onmessage = (res) => {
      this.healthDashboardData = JSON.parse(res.data);
      const mttrData = {
        labels: this.healthDashboardData.spec.incidentTable.reverse(),
        data: []
      };

      const mttdData = {
        labels: this.healthDashboardData.spec.incidentTable.reverse(),
        data: []
      };

      for ( let i = 0; i < mttrData.labels.length; i++) {

        mttrData.data.push(this.get_seconds(this.healthDashboardData.spec.mttr[mttrData.labels[i]]));

        mttdData.data.push(this.get_seconds(this.healthDashboardData.spec.mttd[mttdData.labels[i]]));
        const formatedDate = formatDate(mttrData.labels[i], 'dd-MM-yy', this.locale);
        mttrData.labels[i] = mttdData.labels[i] = formatedDate;

      }

      this.mttrChartData = mttrData;
      this.mttdChartData = mttdData;

    };
  }

  get_seconds(date) {
    let split_string = [];

    if (date.indexOf('m') !== -1) {
      split_string = date.split('m');
      const total_min = split_string[0] * 60;
      const total_sec = Number(split_string[1].split('s')[0]);

      return total_min + total_sec;
    } else {
      return  Number(date.split('s')[0]);
    }

  }

}
