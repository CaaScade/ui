import { Component, OnInit, OnDestroy } from '@angular/core';
import {ApiCallService} from '../../utils/http.service';
import {Urls} from '../../utils/urls';
import { environment } from '../../../environments/environment';
import ioMetrics from 'socket.io-prometheus';
// import {promRegister} from 'prom-client'.register


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ApiCallService]

})
export class DashboardComponent implements OnInit, OnDestroy {
  search = '';
  isMobile = false;
  applications: any = [];
  dashboard_overview: any = {};
  showUnderline = false;
  socket: any;
  constructor(private callAPI: ApiCallService) {}

  ngOnInit() {
    if (window.outerWidth < 768) {
      this.isMobile = true;
    }
    this.callAPI.callGetAPI(Urls.BASE_URL + '/' + Urls.APPLICATION_BASE).subscribe(data => {
      this.applications = data;
    });

    this.socket = new WebSocket(`ws://${environment.host}/stats`);

    this.socket.onmessage = (res) => {
      this.dashboard_overview = JSON.parse(res.data);
    };

  }

  ngOnDestroy() {
    this.socket.close();
  }


}
