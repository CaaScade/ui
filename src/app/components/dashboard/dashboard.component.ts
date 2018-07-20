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

    const socket = new WebSocket(`ws://localhost:8080/stats`);

    socket.onmessage = (res) => {
      this.dashboard_overview = JSON.parse(res.data);
    };

  }


}
