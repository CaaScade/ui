import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-update-password-dialog',
  templateUrl: './update-password-dialog.component.html',
  styleUrls: ['./update-password-dialog.component.scss']
})
export class UpdatePasswordDialogComponent implements OnInit {
  newPassword = '';

  constructor(public dialogRef: MatDialogRef<UpdatePasswordDialogComponent>) { }

  ngOnInit() {
  }

}
