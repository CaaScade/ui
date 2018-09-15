import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {LocalStorageService} from './localStorage.service';

@Injectable()
export class ApiCallService {

  constructor(
    public router: Router,
    private http: HttpClient,
    private localstorage: LocalStorageService) {

  }

  createAuthorizationHeader(headers: HttpHeaders) {
     headers.append('authorization', this.localstorage.getData('_t') );
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
    const req_headers = new HttpHeaders({
      'Authorization': this.localstorage.getData('_t')
    });

    // this.createAuthorizationHeader(req_headers);
    console.log(req_headers);

    return this.http.get(apiurl, {headers: req_headers});
  }

  callPOSTAPI(apiurl: string, data?: any) {
    const req_headers = new HttpHeaders({
      'Authorization': this.localstorage.getData('_t')
    });
    return this.http.post(apiurl, data, {observe: 'response', headers: req_headers});
  }

  callPUTAPI(apiurl: string, data?: any) {
    const req_headers = new HttpHeaders({
      'Authorization': this.localstorage.getData('_t')
    });
    return this.http.put(apiurl, data, {observe: 'response', headers: req_headers});
  }

}
