import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CoreService } from '../../core.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Route, Router } from '@angular/router';
import { StudentVI } from '../../vi/student.vi';
import { StudentService } from '../../student.service';
import { ExamVI } from '../../vi/exam.vi';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  exam: ExamVI;
  student = {
    name: '',
    number: '',
    examNumber: '',
    flag: 0,
    paperId: 0,
    isFinished: 0
  } as StudentVI;
  status = {
    name: { text: '', valid: false },
    number: { text: '', valid: false }
  };
  loginFormValid = false;
  datetime = '';
  nowDatetime = '';
  hasExam = false;

  constructor(private cs: CoreService, private msg: NzMessageService, private r: Router,
    private ss: StudentService) { }

  ngOnInit() {

    this.ss.examInfo().then(x => {
      console.log('ngOnInit', x);
      if (x.status === 0) {
        this.hasExam = true;
        this.exam = x.value;
        window.localStorage.setItem('exam', JSON.stringify(this.exam));
        const date = this.exam.start;
        const checkMinute = this.exam.checkPaperTime;
        const d = new Date(date);
        d.setMinutes(d.getMinutes() - checkMinute);
        this.datetime = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}时${d.getMinutes()}分`;

        const end = new Date(date);
        end.setMinutes(end.getMinutes() + this.exam.minute);

        let count = 0;
        const self = this;
        const interval = setInterval(function () {
          const now = new Date();
          self.nowDatetime = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日\
 ${now.getHours()}时${now.getMinutes()}分${now.getSeconds()}秒`;
          count++;

          let flag = false;
          if (now.getTime() >= d.getTime()) {
            flag = true;
          }
          console.log(now.getMinutes, flag);
          if (flag) {
            self.loginFormValid = true;
          }
        }, 1000);
      } else {
        this.hasExam = false;
      }
    });
  }

  handleNameChange(event: Event) {
    if (this.student.name !== '') {
      this.status.name.text = 'success';
      this.status.name.valid = true;
    } else {
      this.status.name.text = 'failed';
      this.status.name.valid = false;
    }
  }

  handleNumberChange(event: Event) {
    if (this.student.number !== '') {
      this.status.number.text = 'success';
      this.status.number.valid = true;
    } else {
      this.status.number.text = 'failed';
      this.status.number.valid = false;
    }
  }

  verify () {
    if (this.status.name.valid && this.status.number.valid) {
      this.ss.verify({
        examNumber: this.exam.number,
        name: this.student.name,
        number: this.student.number
      }).then(x => {
        console.log(x);
        if (x.status === 0) {
          this.student = x.value;
          this.student.paperId = 0;
          window.localStorage.setItem('student', JSON.stringify(this.student));
          if (this.student.isFinished === 1) {
            this.r.navigate(['/paper']).catch(excp => console.log(excp));
          } else {
            this.r.navigate(['/random']).catch(excp => console.log(excp));
          }
        } else {
          this.msg.error('请核对你填写的考试信息');
        }
      });
    }
  }
}
