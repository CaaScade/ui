import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  menuWidth: any;
  isMobile = false;
  isHide = true;

  constructor() {}

  ngOnInit() {
    if (window.outerWidth < 768) {
      this.isMobile = true;
      this.menuWidth = '1px';
    } else {
      this.menuWidth = '80px';
    }
  }

  toggleMenu() {
    if (this.isMobile) {
      if (this.menuWidth === 100) {
        this.menuWidth = '1px';
        this.isHide = true;
      } else {
        this.menuWidth = 100;
        this.isHide = false;

      }
    } else {
      if (this.menuWidth === 20) {
        this.menuWidth = '80px';
        this.isHide = true;
      } else {
        this.menuWidth = 20;
        this.isHide = false;

      }
    }
  }

}
