import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  users = [{
    name: 'neel',
    team: 'koki',
    role: 'admin'
  }, {name: 'neel',
    team: 'koki',
    role: 'admin'
  }];
  constructor() { }

  ngOnInit() {
  }

}
