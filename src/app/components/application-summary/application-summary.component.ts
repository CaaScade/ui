import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Urls} from '../../utils/urls';
import {ApiCallService} from '../../utils/http.service';

@Component({
  selector: 'app-application-summary',
  templateUrl: './application-summary.component.html',
  styleUrls: ['./application-summary.component.css'],
  providers: [ApiCallService]
})
export class ApplicationSummaryComponent implements OnInit {

  activeApplicationData: any;

  constructor(public activeRouter: ActivatedRoute, private callAPI: ApiCallService) {

    this.activeRouter.params.subscribe(data => {
      this.get_application_data(data.application_name);
    });

  }

  ngOnInit() {

  }

  get_application_data(application_name) {
    this.callAPI.callGetAPI(Urls.BASE_URL + '/' + Urls.APPLICATION_BASE + `/${application_name.toLowerCase()}`).subscribe(data => {
      this.activeApplicationData = data;
    });
  }

}
