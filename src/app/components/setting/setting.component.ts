import { Component, OnInit } from '@angular/core';
import {Urls} from '../../utils/urls';
import {ApiCallService} from '../../utils/http.service';
import {DialogsService} from '../../services/dialog-service.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  users = [];
  roles = [];
  permission = [];
  alert_data: any = {
    Url : '',
    Mention: '',
    Token: '',
    Recipient: ''
  };

  isFirstTime = false;

  constructor(private callAPI: ApiCallService,
              private dialogService: DialogsService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.getAllUsers();
    this.getAllRoles();
    this.getAlert();
  }

  getAllUsers() {
    this.callAPI.callGetAPI(Urls.BASE_URL + '/' + Urls.GET_ALL_USERS).subscribe(( data: any) => {

      for (let i = 0 ; i < data.Result.length; i++) {
        this.callAPI.callGetAPI(Urls.BASE_URL + '/' + Urls.GET_USER_ROLES.replace('{user_name}', data.Result[i].Username)).subscribe((roles: any) => {
          data.Result[i].Permissions = roles.Result[0].Name;
        });
      }
      this.users = data.Result;
    });
  }

  getAllRoles() {
    this.callAPI.callGetAPI(Urls.BASE_URL + '/' + Urls.GET_ALL_ROLES).subscribe(( data: any) => {
      for (let i = 0 ; i < data.Result.length; i++) {

        this.callAPI.callGetAPI(Urls.BASE_URL + '/' + Urls.ROLES_PERMISSIONS.replace('{role_name}', data.Result[i].Name)).subscribe((perm: any) => {
          if (perm.Result.length) {
            console.log(perm.Result.length);
            data.Result[i].Permissions = perm.Result[0];
          }
        });
      }
      this.roles = data.Result;
      console.log(this.roles);
    });
  }


  updatePassword() {
    this.dialogService.updatePasswordDialog().subscribe( data => {
      this.callAPI.callPUTAPI(Urls.BASE_URL + '/' + Urls.UPDATE_USER.replace('{user_name}', 'admin'), { Password: data }).subscribe(( res: any) => {
        this.openSnackBar('Successfully Updated the Password, Please login again', 'ok');

        setTimeout( () => {
          this.router.navigateByUrl('/login');
        }, 4000);
      });
    });

  }

  getAlert() {
    this.callAPI.callGetAPI(Urls.BASE_URL + '/' + Urls.GET_USER_ALERT.replace('{user_name}', 'admin')).subscribe(( data: any) => {

      if (data.Result) {
        const d = data.Result[data.Result.length - 1];
        this.alert_data = {
          Url: d.Url,
          Mention: d.Mention,
          Token: d.Token,
          Recipient: d.Recipient,
          ID: d.ID
        };
      } else  {
        this.isFirstTime = true;
      }

    });

  }

  setAlert() {
    this.callAPI.callPOSTAPI(Urls.BASE_URL + '/' + Urls.GET_USER_ALERT.replace('{user_name}', 'admin'), this.alert_data).subscribe(( data: any) => {
      this.alert_data = data.Result[data.Result.length - 1];
      this.openSnackBar('Successfully set the alert', 'ok');
    });

  }

  updateAlert() {
    this.callAPI.callPUTAPI(Urls.BASE_URL + '/' + Urls.GET_USER_ALERT.replace('{user_name}', 'admin'), this.alert_data).subscribe(( data: any) => {
      // this.alert_data = data.Result;
      this.openSnackBar('Successfully updated alert', 'ok');
    });

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
