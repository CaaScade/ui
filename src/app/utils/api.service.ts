import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response, Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class ApiCallService {

  constructor(private http: Http, private router: Router) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('authorization', localStorage.getItem('_t'));
  }


  createAuthorizationHeaderMicroService(headers: Headers, auth_token: string) {
    headers.append('authorization', auth_token);
  }

  handleResponse(response) {
    if (response.status_code === 200 || response.status_code === 201) {
      return response;
    } else {
      return null;
    }
  }

  handleErrorResponse(error) {
    if (error.statusCode === 401) {
      console.log('here');
      this.router.navigateByUrl('login');
    } else {
      return Observable.throw(error.error || 'Server Error');
    }
  }

  callGetApi(apiurl: string, params?: URLSearchParams) {
    const header = new Headers();
    this.createAuthorizationHeader(header);
    return this.http.get(apiurl, {
      search: params,
      headers: header
    })
      .pipe(map(
        (response: Response) => {
          return this.handleResponse(response.json());
        }
      ), catchError((error: Response) => {
        return this.handleErrorResponse(error.json());
      }
      ));
  }



  callGetApiMicroService(apiurl: string, auth_token: string, params?: URLSearchParams) {
    const header = new Headers();
    this.createAuthorizationHeaderMicroService(header, auth_token);
    this.createAuthorizationHeader(header);
    return this.http.get(apiurl, {
      search: params,
      headers: header
    })
      .pipe(map(
        (response: Response) => {
          return this.handleResponse(response.json());
        }
      ), catchError((error: Response) => {
        return this.handleErrorResponse(error.json());
      }
      ));

  }

  callPostApiMicroService(apiurl: string, auth_token: string, body: any) {
    const header = new Headers();
    this.createAuthorizationHeaderMicroService(header, auth_token);
    this.createAuthorizationHeader(header);
    return this.http.post(apiurl, body, {
      headers: header
    }).pipe(map(
      (response: Response) => {
        return this.handleResponse(response.json());
      }
    ), catchError((error: Response) => {
      return this.handleErrorResponse(error.json());
    }
    ));
  }

  callGetApiNoAuth(apiurl: string) {

    return this.http.get(apiurl, {
    })
      .pipe(map(
        (response: Response) => {
          return this.handleResponse(response.json());
        }
      ), catchError((error: Response) => {
        return this.handleErrorResponse(error.json());
      }
      ));
  }

  callPostApi(apiurl: string, body: any, options?) {
    return this.http.post(apiurl, body, options).pipe(map(
      (response: Response) => {
        return this.handleResponse(response.json());
      }
    ), catchError((error: Response) => {
      return this.handleErrorResponse(error.json());
    }
    ));
  }


  callPutApi(apiurl: string, body: any, params?: URLSearchParams) {
    const header = new Headers();
    this.createAuthorizationHeader(header);

    return this.http.put(apiurl, body, {
      search: params,
      headers: header
    }).pipe(map(
      (response: Response) => {
        return this.handleResponse(response.json());
      }
    ), catchError((error: Response) => {
      return this.handleErrorResponse(error.json());
    }
    ));
  }

  callDeleteApi(apiurl: string, params?: URLSearchParams) {
    const header = new Headers();
    this.createAuthorizationHeader(header);

    return this.http.delete(apiurl, {
      search: params,
      headers: header
    }).pipe(map(
      (response: Response) => {
        return this.handleResponse(response.json());
      }
    ), catchError((error: Response) => {
      return this.handleErrorResponse(error.json());
    }
    ));
  }


  callPostLoginApi(apiurl: string, auth_token: string, body: any) {
    const header = new Headers({
      'Authorization' : 'Basic TE4wVDEyMDg5OkxOQDBUMTIwODk='
    });

    const formData: FormData = new FormData();
    formData.append('email', body.email);
    formData.append('password', body.password);
    const headers = new Headers();

    headers.append('Accept', 'application/json');
    headers.append('Authorization', auth_token);

    const options = new RequestOptions({ headers: headers });
    this.createAuthorizationHeaderMicroService(header, auth_token);
    return this.http.post(apiurl, body, options).pipe(map(
      (response: Response) => {
        return this.handleResponse(response.json());
      }
    ), catchError((error: Response) => {
      return this.handleErrorResponse(error.json());
    }
    ));
  }
  callPostApiFileUpload(apiurl: string, auth_token: string, body: any) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'undefined');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(apiurl, body, options).pipe(map(
      (response: Response) => {
        return this.handleResponse(response.json());
      }
    ), catchError((error: Response) => {
      return this.handleErrorResponse(error.json());
    }
    ));
  }
}















