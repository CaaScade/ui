import { Component, OnInit } from '@angular/core';
import {Urls} from '../../utils/urls';
import {ApiCallService} from '../../utils/http.service';

@Component({
  selector: 'app-sidebaar',
  templateUrl: './sidebaar.component.html',
  styleUrls: ['./sidebaar.component.scss'],
  providers: [ApiCallService]

})
export class SidebaarComponent implements OnInit {

  applications: any;

  constructor(private callAPI: ApiCallService) { }

  ngOnInit() {
    this.callAPI.callGetAPI(Urls.BASE_URL + '/' + Urls.APPLICATION_BASE).subscribe(data => {
      this.applications = data;
    });
  }



}
