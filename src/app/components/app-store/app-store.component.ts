import { Component, OnInit } from '@angular/core';
import {DialogsService} from '../../services/dialog-service.service';
import {ApiCallService} from '../../utils/http.service';

@Component({
  selector: 'app-store',
  templateUrl: './app-store.component.html',
  styleUrls: ['./app-store.component.scss']
})
export class AppStoreComponent implements OnInit {
  isMobile: Boolean = false;
  search: any;
  appStoreData: any = [{
    'bg': 'linear-gradient(60deg,#f3f3f3,#e85f5b)',

    'kind': 'appstore',
    'apiVersion': 'v1alpha1',
    'metadata': {
      'name': 'Redis Stack',
      'namespace': '',
      'creationTimestamp': null,
      'description': 'random description of the sadf fasd fasd sa fas asdf asdfasd'
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
      'uptime': 99.9,
      'features': [],
      'bannerurl': './assets/images/redis.png',
      'architectureurl': './assets/images/redis.jpg',
      'discount': null,
    }
  },
    {
      'bg': 'linear-gradient(60deg,#f3f3f3,#457928)',
      'kind': 'appstore',
      'apiVersion': 'v1alpha1',
      'metadata': {
        'name': 'Zookeeper Stack',
        'namespace': '',
        'creationTimestamp': null,
        'description': 'random description of the sadf fasd fasd sa fas asdf asdfasd'
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
        'uptime': 99.9,
        'features': [],
        'bannerurl': './assets/images/Zookeeper.png',
        'architectureurl': './assets/images/Zookeeper.jpg',
        'discount': null,

      }
    }];

  constructor(private dialogService: DialogsService, private apiCallService: ApiCallService) {
    if (window.outerWidth < 768) {
      this.isMobile = true;
    }
  }

  ngOnInit() {
  }

  showMoreDetails(data: any) {
   this.dialogService.appLaunchDialog(data).subscribe(res => {
     console.log(res);
     this.apiCallService.callPOSTAPI('url', data).subscribe( rdata => {
       // our response
       // toast
     });
   });
  }

}
