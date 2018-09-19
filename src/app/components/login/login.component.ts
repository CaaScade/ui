import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiCallService} from '../../utils/http.service';
import {Urls} from '../../utils/urls';
import {LocalStorageService} from '../../utils/localStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ApiCallService, LocalStorageService]
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: '',
    email: ''
  };

  isSignedup = false;

  constructor(private router: Router,
              private apiCall: ApiCallService,
              private localstorage: LocalStorageService
  ) { }

  ngOnInit() {
  }

  login() {
    const userform_data = new FormData();
    userform_data.append('username', this.user.username);
    userform_data.append('password', this.user.password);

    this.apiCall.callPOSTAPI(Urls.BASE_URL + '/' + Urls.LOGIN_URL, userform_data, false).subscribe(res => {
      this.localstorage.setData('_t', res.headers.get('authorization'));
      this.router.navigateByUrl('/incident-management/home');

    }, (error) => {
      console.log(error);
    });
  }

  signup() {

    const userform_data = new FormData();
    userform_data.append('username', this.user.username);
    userform_data.append('password', this.user.password);
    userform_data.append('email', this.user.email);

    this.apiCall.callPOSTAPI(Urls.BASE_URL + '/' + Urls.REGISTER_URL, userform_data).subscribe(res => {
      this.localstorage.setData('_t', res.headers.get('authorization'));
      this.router.navigateByUrl('/incident-management/home');

    }, error => {
      console.log(error);
    });
  }


  toggleAuth() {
    this.isSignedup = !this.isSignedup;
  }

}
