import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  menuWidth: any = 20;
  constructor() {}

  ngOnInit() {
  }

  toggleMenu() {
    this.menuWidth = (this.menuWidth === 20) ? '80px': 20;
  }
}
