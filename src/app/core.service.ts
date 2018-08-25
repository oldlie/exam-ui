import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigVI } from './vi/config.vi';
import { LoginVI } from './vi/login.vi';
import { Observable } from 'rxjs';
import { LoginResponse } from './ho/login.response';
import { Paper } from './vi/paper.vi';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private loginInfo: LoginVI = {
    account: '',
    token: '',
    isLogin: false
  };
  get LoginInfo() {
    return this.loginInfo;
  }

  private config: ConfigVI = {
    apiURI: 'http://localhost:8080',
    resourceURI: 'http://localhost:80/ex/resource'
  };
  get Config() {
    return this.config;
  }

  private header;
  get Header() {
    return this.header = {
      'Authorization': `Exam ${this.loginInfo.token}`,
      'Content-Type': 'application/json'
    };
  }

  previewPaper: Paper;

  constructor(private hc: HttpClient, private r: Router) { }

  get(url: string, params: any): Observable<Object> {
    return this.hc.get(url, {
      headers: this.Header,
      params: params,
    });
  }

  post(url: string, body: any): Observable<Object> {
    return this.hc.post(url, body, { headers: this.Header });
  }

  delete(url: string, params: any): Observable<Object> {
    return this.hc.delete(url, {
      headers: this.header,
      params: params
    });
  }

  login(username: string, password: string): Promise<LoginResponse> {
    const url = `${this.config.apiURI}/login`;
    const formData = {
      username: username,
      password: password
    };
    return this.post(url, JSON.stringify(formData)).toPromise()
      .then(x => {
        const response = x as LoginResponse;
        if (response.status === 0) {
          this.loginInfo.account = username;
          this.loginInfo.token = response.token;
          this.loginInfo.isLogin = true;
          window.localStorage.setItem('loginInfo', JSON.stringify(this.loginInfo));
        }
        return response;
      });
  }

  logout() {
    const url = `${this.config.apiURI}/logout`;
    this.loginInfo = null;
    window.localStorage.clear();
    this.hc.post(url, null).toPromise().then(x => {
      this.r.navigate(['/admin']).catch(excp => console.log(excp));
    });
  }

  setLoginfo(login: LoginVI) {
    this.loginInfo = login;
  }
}
