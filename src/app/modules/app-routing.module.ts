import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, NavigationStart, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {IncidentsComponent} from '../components/incidents/incidents.component';
import {ClusterComponent} from '../components/cluster/cluster.component';
import {SettingComponent} from '../components/setting/setting.component';
import {ApplicationSummaryComponent} from '../components/application-summary/application-summary.component';


const routes: Routes = [
  { path: '', redirectTo: '/incident-management/home', pathMatch: 'full' },
  { path: 'incident-management', component: HomeComponent,
    children: [
      {path: 'home', component: DashboardComponent},
      {path: 'incidents', component: IncidentsComponent},
      {path: 'cluster', component: ClusterComponent},
      {path: 'settings', component: SettingComponent},
      {path: 'application/:application_name', component: ApplicationSummaryComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(public router: Router) {

    router.events.forEach((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
      }
      if (event instanceof NavigationEnd) {
      }
    });
  }

}
