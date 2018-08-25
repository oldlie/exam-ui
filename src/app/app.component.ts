import { Component, OnInit } from '@angular/core';
import { CoreService } from './core.service';
import { Router } from '@angular/router';
import { logging } from 'protractor';
import { LoginVI } from './vi/login.vi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private cs: CoreService, private r: Router) { }

  ngOnInit() {
    const logiInfoStr = window.localStorage.getItem('loginInfo');
    console.log('loginf str', logiInfoStr);

    if (logiInfoStr) {
      const loginInfo = JSON.parse(logiInfoStr) as LoginVI;
      if (loginInfo.isLogin) {
        this.cs.setLoginfo(loginInfo);
        return;
      }
    }
    // this.r.navigate(['/']).then(excp => console.log(excp));
  }
}
