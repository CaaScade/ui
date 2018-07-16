import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems = [{
    id: 1,
    name: 'home',
    icon: 'home'
  }, {
    id: 1,
    name: 'incidents',
    icon: 'error'
  },{
    id: 1,
    name: 'cluster',
    icon: 'dns'
  },{
    id: 1,
    name: 'setting',
    icon: 'settings'
  },];

  constructor() { }

  ngOnInit() {
  }

}
