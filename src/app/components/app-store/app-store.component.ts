import { Component, OnInit } from '@angular/core';
import {DialogsService} from '../../services/dialog-service.service';
import {ApiCallService} from '../../utils/http.service';
import {MatSnackBar} from '@angular/material';
import {Urls} from '../../utils/urls';
import {LocalStorageService} from '../../utils/localStorage.service';

@Component({
  selector: 'app-store',
  templateUrl: './app-store.component.html',
  styleUrls: ['./app-store.component.scss']
})
export class AppStoreComponent implements OnInit {
  isMobile: Boolean = false;
  search: any;
  all_applications: any;
  user_applications: any;
  appStoreData: any = [];



  constructor(private dialogService: DialogsService, private apiCallService: ApiCallService, private snackBar: MatSnackBar, private localstorage: LocalStorageService) {
    if (window.outerWidth < 768) {
      this.isMobile = true;
    }
  }

  ngOnInit() {
    this.getAllInstalledApplications();
    this.getAllApplications();
  }

  getAllApplications() {
    this.apiCallService.callGetAPI(Urls.BASE_URL + '/' + Urls.GET_ALL_APPLICATIONS).subscribe( applicationsData => {
      console.log(applicationsData);
      this.all_applications = applicationsData['Result'];
    }, (error) => {
      this.openSnackBar(error.message, 'ok');
    });
  }

  getAllInstalledApplications() {
    this.apiCallService.callGetAPI(Urls.BASE_URL + '/' + Urls.GET_APPLICATIONS_OF_USER.replace('{user_name}', this.localstorage.getData('_u'))).subscribe( applicationsData => {
      this.user_applications = applicationsData['Result'];
    }, (error) => {
      this.openSnackBar(error.message, 'ok');
    });
  }

  showMoreDetails(data: any, isInstalled: Boolean) {
    this.dialogService.appLaunchDialog(data, isInstalled).subscribe(res => {
      if (res && isInstalled === false) {
        this.apiCallService.callPOSTAPI(Urls.BASE_URL + '/' + Urls.LAUNCH_APPLICATION.replace('{user_name}', this.localstorage.getData('_u')), res).subscribe(rdata => {
          this.openSnackBar(`Successfully launch the ${rdata.body['Result'].Name}`, 'ok');
        });
      }
      if (res && isInstalled === true) {
        console.log('user has selected', res);
        // this.apiCallService.callPOSTAPI(Urls.BASE_URL + '/' + Urls.LAUNCH_APPLICATION.replace('{user_name}', this.localstorage.getData('_u')), res).subscribe(rdata => {
        //   this.openSnackBar(`Successfully launch the ${rdata.body.Result.Name}`, 'ok');
        // });
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
