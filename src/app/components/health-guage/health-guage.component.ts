import {Component, Input, OnInit} from '@angular/core';
import * as guage from 'svg-gauge';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-health-guage',
  templateUrl: './health-guage.component.html',
  styleUrls: ['./health-guage.component.css']
})
export class HealthGuageComponent implements OnInit {

  @Input()
  set healthPer(val) {
    this.healthValue = val;
    this.createGuage(this.healthValue);
  }

  healthValue = 0;
  healthGuage: any;

  constructor() { }

  ngOnInit() {

  }

  createGuage(guageValue) {
    if (isNullOrUndefined(this.healthGuage)) {
      this.healthGuage = guage(document.getElementById('healthGuage'), {
        max: 100,
        dialStartAngle: 135,
        dialEndAngle: 45,

        // custom label renderer
        label: function (value) {
          return Math.round(value) + '%';
        },
        value: guageValue,
        // Custom dial colors (Optional)
        color: function (value) {
          if (value < 20) {
            return '#ef4655'; // green
          } else if (value < 40) {
            return '#f7aa38'; // yellow
          } else if (value < 60) {
            return '#fffa50'; // orange
          } else {
            return '#5ee432'; // red
          }
        }
      });
    } else {
      this.healthGuage.setValueAnimated(guageValue, 1);
    }

  }
}
