import { Component, OnInit } from '@angular/core';
import {ApiCallService} from '../../utils/http.service';
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
    });
  }




}
