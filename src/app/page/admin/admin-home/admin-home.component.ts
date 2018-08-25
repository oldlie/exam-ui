import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../../core.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  username: string;
  usernameStatus  = {
    text: '',
    valid: false
  };
  passowrd: string;
  passowrdStatus = {
    text: '',
    valid: false
  };

  constructor(private cs: CoreService, private msg: NzMessageService, private r: Router) { }

  ngOnInit() {
  }

  handleUsernameChange(event: Event) {
    if (this.username.length < 3) {
      this.usernameStatus.text = 'error';
      this.usernameStatus.valid = false;
    } else {
      this.usernameStatus.text = 'success';
      this.usernameStatus.valid = true;
    }
  }

  handlePasswordChange(event: Event) {
    const reg = /^[a-zA-Z0-9_-]{6,32}$/;
    console.log('password', this.passowrd);
    if (reg.test(this.passowrd)) {
      this.passowrdStatus.text = 'success';
      this.passowrdStatus.valid = true;
    } else {
      this.passowrdStatus.text = 'error';
      this.passowrdStatus.valid = false;
    }
  }

  login() {
    if (this.passowrdStatus.valid && this.usernameStatus.valid) {
      this.cs.login(this.username, this.passowrd).then(x => {
        console.log(x);
        if (x.status === 0) {
          this.r.navigate(['/admin/dashboard']).catch(excp => console.log(excp));
        } else {
          this.msg.error('账号或者密码不正确');
        }
      });
    }
  }
}
