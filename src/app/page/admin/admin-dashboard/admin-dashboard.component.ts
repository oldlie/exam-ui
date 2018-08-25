import { Component, OnInit } from '@angular/core';
import { Paper } from '../../../vi/paper.vi';
import { ManagerService } from '../../../manager.service';
import { NzMessageService } from 'ng-zorro-antd';
import { CoreService } from '../../../core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  providers: [
    ManagerService
  ]
})
export class AdminDashboardComponent implements OnInit {

  paper: Paper;
  tabIndex = 0;
  password = '';
  password1 = '';
  password2 = '';
  valid = false;

  password1Status = { text: '', valid: false };
  password2Status = { text: '', valid: false };

  constructor(private cs: CoreService, private ms: ManagerService, private msg: NzMessageService, private r: Router) { }

  ngOnInit() {
    if (!this.cs.LoginInfo || !this.cs.LoginInfo.isLogin) {
      this.r.navigate(['/admin']).catch(excp => console.log(excp));
    }
  }

  handlePassword1Change(event: Event) {
    const reg = /^[a-zA-Z0-9_-]{6,32}$/;
    console.log('password', this.password1);
    if (reg.test(this.password1)) {
      this.password1Status.text = 'success';
      this.password1Status.valid = true;
    } else {
      this.password1Status.text = 'error';
      this.password1Status.valid = false;
    }
    this.checkVerify();
  }

  handlePassword2Change(event: Event) {
    const reg = /^[a-zA-Z0-9_-]{6,32}$/;
    console.log('password', this.password2);
    if (reg.test(this.password2) && this.password1 === this.password2) {
      this.password2Status.text = 'success';
      this.password2Status.valid = true;
    } else {
      this.password2Status.text = 'error';
      this.password2Status.valid = false;
    }
    this.checkVerify();
  }

  update() {
    this.ms.password(this.password1).then(x => {
      if (x.status === 0) {
        this.msg.success('已修改');
      } else {
        this.msg.error(x.message);
      }
    });
  }

  signout() {
    this.cs.logout();
  }

  private checkVerify() {
    this.valid = this.password1Status.valid && this.password2Status.valid;
  }
}
