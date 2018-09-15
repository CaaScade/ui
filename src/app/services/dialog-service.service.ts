
import { MatDialogRef, MatDialog, MatDialogConfig, MatDialogActions } from '@angular/material';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {AppLaunchDialogComponent} from '../components/common_components/app-launch-dialog/app-launch-dialog.component';
import {UpdatePasswordDialogComponent} from '../components/common_components/update-password-dialog/update-password-dialog.component';

@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) {
  }

  public appLaunchDialog(data: any): Observable<any> {
    let dialogRef: MatDialogRef<AppLaunchDialogComponent>;

    dialogRef = this.dialog.open(AppLaunchDialogComponent);
    dialogRef.componentInstance.appData = data;
    return dialogRef.afterClosed();
  }

  public updatePasswordDialog(): Observable<any> {
    let dialogRef: MatDialogRef<UpdatePasswordDialogComponent>;

    dialogRef = this.dialog.open(UpdatePasswordDialogComponent);
    return dialogRef.afterClosed();
  }
}
