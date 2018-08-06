import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {Urls} from '../../utils/urls';
import {ApiCallService} from '../../utils/http.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-application-summary',
  templateUrl: './application-summary.component.html',
  styleUrls: ['./application-summary.component.scss'],
  providers: [ApiCallService]
})
export class ApplicationSummaryComponent implements OnInit {

  activeApplicationData: any;
  healthDashboardData: any;
  systemStatsData: any = {};
  mttrChartData: any;
  incidentChartData: any;
  applicationSummarySocket: any;

  stats = {
    mttr: 0,
    mttd: 0
  };


  constructor(public activeRouter: ActivatedRoute, private callAPI: ApiCallService, @Inject(LOCALE_ID) private locale: string) {

    this.activeRouter.params.subscribe(data => {
      this.get_application_data(data.application_name);
      this.get_health_dashboard_data(data.application_name);
      this.get_system_stash_data(data.application_name);

      this.healthDashboardData = null;
      this.systemStatsData = {};
      this.mttrChartData = null;
      this.incidentChartData = null;
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
    this.applicationSummarySocket = new WebSocket(`ws://${environment.host}/stats/${application_name.toLowerCase()}/health-dashboard`);

    this.applicationSummarySocket.onmessage = (res) => {
      this.healthDashboardData = JSON.parse(res.data);
      const mttrData = {
        labels: this.healthDashboardData.spec.incidentTable.reverse(),
        data: []
      };

      const mttdData = {
        labels: this.healthDashboardData.spec.incidentTable.reverse(),
        data: []
      };

      const incidentChartData = {
        labels: new Array(this.healthDashboardData.spec.incidentTable.length),
        data: []
      };

      for ( let i = 0; i < mttrData.labels.length; i++) {

        mttrData.data.push(this.get_seconds(this.healthDashboardData.spec.mttr[mttrData.labels[i]]));
        mttdData.data.push(this.get_seconds(this.healthDashboardData.spec.mttd[mttdData.labels[i]]));

        incidentChartData.data.push(new Date(mttdData.labels[i]));


        const formatedDate = formatDate(mttrData.labels[i], 'dd-MM-yy', this.locale);
        mttrData.labels[i] = mttdData.labels[i] = formatedDate;

      }
      this.stats.mttd = (mttdData.data.reduce((a,b) => a + b, 0 ) / mttdData.data.length);
      this.stats.mttr = (mttrData.data.reduce((a,b) => a + b, 0 ) / mttdData.data.length);


      this.incidentChartData = incidentChartData;
      this.incidentChartData['data'] = [incidentChartData.data];

      this.mttrChartData = mttrData;
      this.mttrChartData['data'] = [mttrData.data, mttdData.data];




    };
  }

  get_system_stash_data(application_name) {
    const socket = new WebSocket(`ws://${environment.host}/stats/${application_name.toLowerCase()}/system-stats`);

    socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const objectKey = Object.keys(data.spec.cpu)[0];

      this.systemStatsData.cpu = {
        labels: objectKey,
        data: [ data.spec.cpu[objectKey].split('%')[0] ]
      };

      this.systemStatsData.memory = {
        labels: objectKey,
        data: [ data.spec.mem[objectKey].split('M')[0].split('-')[1] / 1000000 ]
      };

      this.systemStatsData.storage = {
        labels: objectKey,
        data: [ data.spec.storage[objectKey].split('M')[0].split('-')[1] / 1000000 ]
      };

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
