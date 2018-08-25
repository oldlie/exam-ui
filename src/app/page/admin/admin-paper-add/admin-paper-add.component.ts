import { Component, OnInit, Input } from '@angular/core';
import { CoreService } from '../../../core.service';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { ManagerService } from '../../../manager.service';
import { Paper } from '../../../vi/paper.vi';

@Component({
  selector: 'app-admin-paper-add',
  templateUrl: './admin-paper-add.component.html',
  styleUrls: ['./admin-paper-add.component.css'],
  providers: [
    ManagerService
  ]
})
export class AdminPaperAddComponent implements OnInit {

  @Input() paper: Paper;
  options: Object = {};
  numberStatus = {
    text: '',
    valid: false
  };

  constructor(private cs: CoreService, private manager: ManagerService, private msg: NzMessageService,
    private notify: NzNotificationService) { }

  ngOnInit() {
    if (!this.paper) {
      this.paper = {
        id: 0,
        number: '',
        content: '',
        status: 0
      };
    } else {
      this.numberStatus.valid = true;
    }
    this.options = {
      placeholder: '填入试卷',
      imageUploadMethod: 'POST',
      imageUploadURL: this.cs.Config.apiURI + '/image',
    };
  }

  handleNumberChange(event: Event) {
    if (this.paper.number && this.paper.number.length > 0) {
      this.numberStatus.valid = true;
      this.numberStatus.text = 'success';
    } else {
      this.numberStatus.valid = false;
      this.numberStatus.text = 'falied';
    }
  }

  save() {
    if (!this.numberStatus.valid) {
      return;
    }
    if (!this.paper.content || this.paper.content === '') {
      this.notify.warning('提示', '请填写试卷内容');
      return;
    }
    this.manager.storePaper(this.paper).then(x => {
      if (x.status === 0) {
        this.msg.success('已保存');
      } else {
        this.msg.error('保存出了点问题，稍后再试');
        console.log(x.message);
      }
    });
  }

  preview() {
  }
}
