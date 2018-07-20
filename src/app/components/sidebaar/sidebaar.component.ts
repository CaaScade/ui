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
  search = '';
  applications: any;
  dashboardMenu: any = [
    {id: 1,
      name: 'Cluster Overview',
    }, {id: 2,
      name: 'Change Failure Rate',
    }, {id: 3,
      name: 'Deployment Frequency',
    },{id: 4,
      name: 'Mean Time to Detection',
    },{id: 5,
      name: 'Mean Time to Recovery',
    },
  ];

  constructor(private callAPI: ApiCallService) { }

  ngOnInit() {
    this.callAPI.callGetAPI(Urls.BASE_URL + '/' + Urls.APPLICATION_BASE).subscribe(data => {
      this.applications = data;
    });
  }



}
