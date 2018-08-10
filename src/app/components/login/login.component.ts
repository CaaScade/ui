import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiCallService} from '../../utils/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: '',
    email: ''
  };

  isSignedup = false;

  constructor(private router: Router,
              private apiCall: ApiCallService) { }

  ngOnInit() {
  }

  login() {
    console.log('in login', this.user);

  }
  signup() {

    const userform_data = new FormData();
    userform_data.append('username', this.user.username);
    userform_data.append('password', this.user.password);

    this.apiCall.callPOSTAPI('', userform_data).subscribe(res => {
      this.router.navigateByUrl('/incident-management/home');

    }, error => {
      console.log(error);
    });
  }


  toggleAuth(){
    this.isSignedup = !this.isSignedup;
  }

}
