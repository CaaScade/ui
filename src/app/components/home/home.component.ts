import { Component, OnInit } from '@angular/core';
import {BreadCrumb} from '../../models/breadcrumbType';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Urls} from '../../utils/urls';
import {ApiCallService} from '../../utils/http.service';
import {LocalStorageService} from '../../utils/localStorage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  menuWidth: any;
  isMobile = false;
  isHide = true;

  breadcrumbs: any = [];

  constructor(public router: Router, public activatedRoute: ActivatedRoute, private callAPI: ApiCallService, private localstorage: LocalStorageService) {
    this.router.events.pipe
    (
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map(event =>  this.buildBreadCrumb(this.activatedRoute.root))
    ).subscribe(res => {
      this.breadcrumbs = res;
    });
  }

  ngOnInit() {
    if (window.outerWidth < 768) {
      this.isMobile = true;
      this.menuWidth = '1px';
    } else {
      this.menuWidth = '80px';
    }
  }

  toggleMenu() {
    if (this.isMobile) {
      if (this.menuWidth === 100) {
        this.menuWidth = '1px';
        this.isHide = true;
      } else {
        this.menuWidth = 100;
        this.isHide = false;

      }
    } else {
      if (this.menuWidth === 20) {
        this.menuWidth = '80px';
        this.isHide = true;
      } else {
        this.menuWidth = 20;
        this.isHide = false;

      }
    }
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '',
                  breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    const label = route.routeConfig ? route.routeConfig.data[ 'breadcrumb' ] : 'Home';
    const path = route.routeConfig ? route.routeConfig.path : '';

    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
      label: label,
      url: nextUrl
    };
    const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

  logout() {
    this.callAPI.callGetAPI(Urls.BASE_URL + '/' + Urls.LOGOUT_URL).subscribe(( data: any) => {
      this.localstorage.clearAll();
      this.router.navigateByUrl('/login');

    }, error => {
      this.localstorage.clearAll();
      this.router.navigateByUrl('/login');
    });
  }


}
