import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-app-launch-dialog',
  templateUrl: './app-launch-dialog.component.html',
  styleUrls: ['./app-launch-dialog.component.scss']
})
export class AppLaunchDialogComponent implements OnInit {

  appData: any;

  constructor(public dialogRef: MatDialogRef<AppLaunchDialogComponent>) { }

  ngOnInit() {
  }

}
