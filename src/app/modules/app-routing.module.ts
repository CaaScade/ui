import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, NavigationStart, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import {HomeComponent} from '../components/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
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
