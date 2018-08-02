import { Component, OnInit } from '@angular/core';
import {DialogsService} from '../../services/dialog-service.service';

@Component({
  selector: 'app-store',
  templateUrl: './app-store.component.html',
  styleUrls: ['./app-store.component.scss']
})
export class AppStoreComponent implements OnInit {

  appStoreData: any = [{
    'kind': 'appstore',
    'apiVersion': 'v1alpha1',
    'metadata': {
      'name': 'MEAN Stask',
      'namespace': '',
      'creationTimestamp': null
    },
    'spec': {
      'price': 23,
      'appstack': [{
        'id': 1,
        'name': 'angular'
      }, {
        'id': 2,
        'name': 'nodejs'
      }, {
        'id': 3,
        'name': 'mongodb'
      },{
         'id': 4,
        'name': 'expressjs'
      }],
      'uptime': 98.7,
      'features': ['some more features over here'],
      'bannerurl': './assets/images/mean.png',
      'architectureurl': './assets/images/meanflow.jpg',
      'discount': null
    }
  }];

  constructor(private dialogService: DialogsService) { }

  ngOnInit() {
  }

  showMoreDetails(data: any) {
   this.dialogService.appLaunchDialog(data).subscribe(res => {
     console.log(res);
   });
  }

}
