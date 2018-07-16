import { Component, OnInit } from '@angular/core';
import {ApiCallService} from '../../utils/http.service';
import * as guage from 'svg-gauge';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ApiCallService]
})
export class HomeComponent implements OnInit {

  applications = [
    {
      'kind': 'Application',
      'apiVersion': 'v1alpha1',
      'metadata': {
        'name': 'Postgres',
        'namespace': 'DBAdmin',
        'creationTimestamp': null,
        'labels': {
          'app': 'postgres'
        },
        'clusterName': 'aws-cluster'
      },
      'spec': {
        'replicas': 6,
        'version': 'v6.1',
        'autoRecovery': true
      },
      'status': {
        'lastUpdate': '2018-07-16T10:37:11.9603136Z',
        'lastIncident': '2018-07-16T10:37:11.960301Z'
      }
    },
    {
      'kind': 'Application',
      'apiVersion': 'v1alpha1',
      'metadata': {
        'name': 'Redis',
        'namespace': 'DBAdmin',
        'creationTimestamp': null,
        'labels': {
          'app': 'redis'
        },
        'clusterName': 'aws-cluster'
      },
      'spec': {
        'replicas': 3,
        'version': 'v1.0',
        'autoRecovery': true
      },
      'status': {
        'lastUpdate': '2018-07-16T10:37:11.9603563Z',
        'lastIncident': '2018-07-16T10:37:11.9603446Z'
      }
    },
    {
      'kind': 'Application',
      'apiVersion': 'v1alpha1',
      'metadata': {
        'name': 'Redis',
        'namespace': 'DBAdmin',
        'creationTimestamp': null,
        'labels': {
          'app': 'redis'
        },
        'clusterName': 'aws-cluster'
      },
      'spec': {
        'replicas': 3,
        'version': 'v1.0',
        'autoRecovery': true
      },
      'status': {
        'lastUpdate': '2018-07-16T10:37:11.9603563Z',
        'lastIncident': '2018-07-16T10:37:11.9603446Z'
      }
    },
    {
      'kind': 'Application',
      'apiVersion': 'v1alpha1',
      'metadata': {
        'name': 'Redis',
        'namespace': 'DBAdmin',
        'creationTimestamp': null,
        'labels': {
          'app': 'redis'
        },
        'clusterName': 'aws-cluster'
      },
      'spec': {
        'replicas': 3,
        'version': 'v1.0',
        'autoRecovery': true
      },
      'status': {
        'lastUpdate': '2018-07-16T10:37:11.9603563Z',
        'lastIncident': '2018-07-16T10:37:11.9603446Z'
      }
    },
    {
      'kind': 'Application',
      'apiVersion': 'v1alpha1',
      'metadata': {
        'name': 'Redis',
        'namespace': 'DBAdmin',
        'creationTimestamp': null,
        'labels': {
          'app': 'redis'
        },
        'clusterName': 'aws-cluster'
      },
      'spec': {
        'replicas': 3,
        'version': 'v1.0',
        'autoRecovery': true
      },
      'status': {
        'lastUpdate': '2018-07-16T10:37:11.9603563Z',
        'lastIncident': '2018-07-16T10:37:11.9603446Z'
      }
    },
    {
      'kind': 'Application',
      'apiVersion': 'v1alpha1',
      'metadata': {
        'name': 'Redis',
        'namespace': 'DBAdmin',
        'creationTimestamp': null,
        'labels': {
          'app': 'redis'
        },
        'clusterName': 'aws-cluster'
      },
      'spec': {
        'replicas': 3,
        'version': 'v1.0',
        'autoRecovery': true
      },
      'status': {
        'lastUpdate': '2018-07-16T10:37:11.9603563Z',
        'lastIncident': '2018-07-16T10:37:11.9603446Z'
      }
    },
    {
      'kind': 'Application',
      'apiVersion': 'v1alpha1',
      'metadata': {
        'name': 'Redis',
        'namespace': 'DBAdmin',
        'creationTimestamp': null,
        'labels': {
          'app': 'redis'
        },
        'clusterName': 'aws-cluster'
      },
      'spec': {
        'replicas': 3,
        'version': 'v1.0',
        'autoRecovery': true
      },
      'status': {
        'lastUpdate': '2018-07-16T10:37:11.9603563Z',
        'lastIncident': '2018-07-16T10:37:11.9603446Z'
      }
    }
  ];


  dashboard_overview = {
    'kind': 'Stats',
    'apiVersion': 'v1alpha1',
    'metadata': {
      'name': 'Dashboard',
      'namespace': 'admin',
      'creationTimestamp': null
    },
    'Spec': {
      'totalApps': 52,
      'totalIncidents': 17,
      'averageRecoveryTime': '4m 16s',
      'averageChangesPerWeek': 435,
      'averageRecoveryTimeDelta': -1,
      'averageChangesPerWeekDelta': 1,
      'overallHealthPercentage': 10
    }
  };

  application_details = {
    'kind': 'Application',
    'apiVersion': 'v1alpha1',
    'metadata': {
      'name': 'Redis',
      'namespace': 'DBAdmin',
      'creationTimestamp': null,
      'labels': {
        'app': 'redis'
      },
      'clusterName': 'aws-cluster'
    },
    'spec': {
      'replicas': 3,
      'version': 'v1.0',
      'autoRecovery': true
    },
    'status': {
      'lastUpdate': '2018-07-16T10:44:16.153019Z',
      'lastIncident': '2018-07-16T10:44:16.1530079Z'
    }
  };
  constructor(private callAPI: ApiCallService) {


  }

  ngOnInit() {
    this.callAPI.callGetAPI('http://localhost:8080/stats').subscribe(data => {
      console.log(data);
    });
    const cpuGauge = guage(document.getElementById('cpuSpeed'), {
      max: 100,
      // custom label renderer
      label: function(value) {
        return Math.round(value) + '%';
      },
      value: this.dashboard_overview.Spec.overallHealthPercentage,
      // Custom dial colors (Optional)
      color: function(value) {
        if(value < 20) {
          return '#ef4655'; // green
        }else if(value < 40) {
          return '#f7aa38'; // yellow
        }else if(value < 60) {
          return '#fffa50'; // orange
        }else {
          return '#5ee432'; // red
        }
      }
    });
  }

}
