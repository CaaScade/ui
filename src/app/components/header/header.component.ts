import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems = [{
    id: 1,
    name: 'Home',
    icon: 'home',
    link: 'home'
  }, {
    id: 2,
    name: 'Incidents',
    icon: 'error',
    link: 'incidents'

  }, {
    id: 3,
    name: 'Cluster',
    icon: 'dns',
    link: 'cluster'
  }, {
    id: 4,
    name: 'Setting',
    icon: 'settings',
    link: 'setting'
  }];

  constructor() { }

  ngOnInit() {
  }

}
