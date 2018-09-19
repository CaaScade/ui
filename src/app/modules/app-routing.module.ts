import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, NavigationStart, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {AppStoreComponent} from '../components/app-store/app-store.component';
import {ClusterComponent} from '../components/cluster/cluster.component';
import {SettingComponent} from '../components/setting/setting.component';
import {ApplicationSummaryComponent} from '../components/application-summary/application-summary.component';
import {LoginComponent} from '../components/login/login.component';
import {MatSnackBar} from '@angular/material';
import {Local} from 'protractor/built/driverProviders';
import {LocalStorageService} from '../utils/localStorage.service';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'incident-management', component: HomeComponent,
    data: {
      breadcrumb: ''
    },
    children: [
      {path: 'home', component: DashboardComponent, data: {
          breadcrumb: 'Home'
        }},
      {path: 'appstore', component: AppStoreComponent, data: {
          breadcrumb: 'App Store'
        }},
      {path: 'cluster', component: ClusterComponent, data: {
          breadcrumb: 'Cluster'
        }},
      {path: 'settings', component: SettingComponent, data: {
          breadcrumb: 'Setting'
        }},
      {path: 'application/:application_name', component: ApplicationSummaryComponent, data: {
          breadcrumb: 'Application'
        }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(public router: Router, private snackBar: MatSnackBar, private localstorage: LocalStorageService) {

    router.events.forEach((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        if ( localstorage.getData('_t') === null && event.url !== '/' && event.url.indexOf('login') === -1) {
          this.snackBar.open('Please Login again', '', {
            duration: 2000,
          });
          this.localstorage.clearAll();
          this.router.navigateByUrl('/login');

        }
      }
      if (event instanceof NavigationEnd) {
      }
    });
  }

}
