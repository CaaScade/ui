import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ApiCallService {

  constructor(public router: Router, private http: HttpClient){}

  createAuthorizationHeader(headers: Headers) {
    // headers.append('authorization', OUR AUTH TOKN);
  }

  handleResponse(response) {
    if (response.status_code === 200 || response.status_code === 201 || response.status_code === 202) {
      return response;
    } else if ((response.status_code && response.status_code === 401) || (response.statusCode && response.statusCode === 401)) {
      this.router.navigateByUrl('login');
    } else {
      return null;
    }
  }

  callGetAPI(apiurl: string, params?: URLSearchParams) {
    return this.http.get(apiurl);
  }

  callPOSTAPI(apiurl: string, data?: any) {
    return this.http.post(apiurl, data);
  }

}
