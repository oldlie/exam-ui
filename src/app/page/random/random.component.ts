import { Component, OnInit } from '@angular/core';
import { ExamVI } from '../../vi/exam.vi';
import { StudentVI } from '../../vi/student.vi';
import { StudentService } from '../../student.service';
import { Router } from '@angular/router';
import { Paper } from '../../vi/paper.vi';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {

  numberList = [] as Array<string>;
  size = 16;
  starttime = '';
  endtime = '';
  lefttime = '';
  exam: ExamVI;
  isCheckView = true;
  paper: Paper;
  isShowPaper = false;
  isFinished = false;
  student: StudentVI;
  tip = '';

  constructor(private msg: NzMessageService, private r: Router, private ss: StudentService) { }

  ngOnInit() {

    this.student = JSON.parse(window.localStorage.getItem('student')) as StudentVI;
    if (this.student === undefined || this.student === null || this.student.isFinished) {
      this.r.navigate(['/']).catch(excp => console.error(excp));
      return;
    }

    const paper = JSON.parse(window.localStorage.getItem('paper')) as Paper;
    console.log('paper', paper);
    if (paper) {
      paper.id = 0;
      this.isCheckView = false;
      this.paper = paper;
      this.tip = '试卷已经加载，注意开考时间';
      const self = this;
      this.exam = JSON.parse(window.localStorage.getItem('exam')) as ExamVI;
      const end = new Date(this.exam.start);
      end.setMinutes(end.getMinutes() + this.exam.minute);

      const date = new Date(this.exam.start);
      this.starttime = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 \
${date.getHours()}时${date.getMinutes()}分`;
      this.endtime = `${end.getHours()}时${end.getMinutes()}分`;

      const interval = setInterval(function () {
        const now = new Date();
        self.lefttime = `${now.getHours()}时${now.getMinutes()}分${now.getSeconds()}秒`;

        if (date.getTime() < now.getTime()) {
          // 考试开始
          self.isShowPaper = true;
          self.tip = '';
        }

        if (end.getTime() < now.getTime()) {
          clearInterval(interval);
          self.ss.finish({ id: self.student.id }).then(x => {
            window.localStorage.removeItem('paper');
            self.r.navigate(['/paper']).catch(excp => console.log(excp));
          });
        }
      }, 1000);
    } else {
      this.init();
    }
  }

  init() {
    this.refresh();
    this.exam = JSON.parse(window.localStorage.getItem('exam')) as ExamVI;
    const date = new Date(this.exam.start);
    this.starttime = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 \
${date.getHours()}时${date.getMinutes()}分`;
    const end = new Date(this.exam.start);
    end.setMinutes(end.getMinutes() + this.exam.minute);
    this.endtime = `${end.getHours()}时${end.getMinutes()}分`;
    const self = this;
    let count = 0;

    const interval = setInterval(function () {
      const now = new Date();
      self.lefttime = `${now.getHours()}时${now.getMinutes()}分${now.getSeconds()}秒`;

      count++;

      if (date.getTime() < now.getTime()) {
        // 考试开始
        self.isShowPaper = true;
        self.tip = '';
      }

      if (end.getTime() < now.getTime()) {
        clearInterval(interval);
        self.ss.finish({ id: self.student.id }).then(x => {
          window.localStorage.removeItem('paper');
          self.r.navigate(['/paper']).catch(excp => console.log(excp));
        });
      }
    }, 1000);
  }

  refresh() {
    const temp = [] as Array<string>;
    for (let i = 0; i < this.size; i++) {
      temp.push(`考卷：${this.randomNum(1, 999)}`);
    }
    this.numberList = temp;
  }

  check(paper: string) {
    console.log(paper);
    this.tip = '试卷已经加载，注意开考时间';
    const student = JSON.parse(window.localStorage.getItem('student')) as StudentVI;
    console.log(student);
    this.ss.paper({
      examNumber: student.examNumber,
      name: student.name,
      number: student.number
    }).then(
      x => {
        console.log(x);
        if (x.status === 0) {
          this.isCheckView = false;
          this.paper = x.value;

          window.localStorage.setItem('paper', JSON.stringify(this.paper));
        }
      }
    );
  }

  submit() {
    this.isFinished = true;
    this.ss.finish({
      id: this.student.id
    }).then(x => {
      console.log(x);
      if (x.status === 0) {
        window.localStorage.removeItem('paper');
        this.r.navigate(['/paper']).catch(excp => console.log(excp));
      } else {
        this.msg.error(x.message);
      }
    });
  }

  private randomNum(minNum: number, maxNum: number): Number {
    switch (arguments.length) {
      case 1:
        return parseInt((Math.random() * minNum + 1).toString(), 10);
      case 2:
        return parseInt((Math.random() * (maxNum - minNum + 1)).toString() + minNum, 10);
      default:
        return 0;
    }
  }
}
