import { Component, OnInit, Input } from '@angular/core';
import {Urls} from '../../utils/urls';
import {ApiCallService} from '../../utils/http.service';

@Component({
  selector: 'app-sidebaar',
  templateUrl: './sidebaar.component.html',
  styleUrls: ['./sidebaar.component.scss'],
  providers: [ApiCallService]

})
export class SidebaarComponent implements OnInit {
  @Input() isMobile: Boolean;
  @Input() isHide: Boolean;

  applications: any;

  menuItems = [{
    id: 1,
    name: 'Home',
    icon: 'home',
    link: 'home'
  }, {
    id: 2,
    name: 'App Store',
    icon: 'store',
    link: 'appstore'

  }, {
    id: 3,
    name: 'Cluster',
    icon: 'dns',
    link: 'cluster'
  }, {
    id: 4,
    name: 'Settings',
    icon: 'settings',
    link: 'settings'
  }];


  constructor(private callAPI: ApiCallService) { }

  ngOnInit() {
    this.callAPI.callGetAPI(Urls.BASE_URL + '/' + Urls.APPLICATION_BASE).subscribe(data => {
      this.applications = data;
    });
  }



}
