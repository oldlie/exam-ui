import { Component, OnInit } from '@angular/core';
import { ExamVI } from '../../../vi/exam.vi';
import { ManagerService } from '../../../manager.service';
import { NzMessageService } from 'ng-zorro-antd';
import { StudentVI } from '../../../vi/student.vi';

@Component({
  selector: 'app-admin-exam',
  templateUrl: './admin-exam.component.html',
  styleUrls: ['./admin-exam.component.css'],
  providers: [
    ManagerService
  ]
})
export class AdminExamComponent implements OnInit {

  examList = [] as Array<ExamVI>;
  page = 0;
  total = 0;
  isEditView = false;
  editExam: ExamVI;
  activeExamTitle = '确定开始考试？';
  isDetailView = false;
  detailExam: ExamVI;
  studentList = [] as Array<StudentVI>;

  constructor(private ms: ManagerService, private msg: NzMessageService) { }

  ngOnInit() {
    this.ms.pageExam(this.page).then(x => {
      console.log(x);
      if (x.status === 0) {
        this.examList = x.list;
        this.total = x.totle;
      } else {
        console.log(x);
      }
    });
  }

  delete(exam: ExamVI) {
    this.ms.deleteExam(exam.id).then(x => {
      if (x.status === 0) {
        const temp = [] as Array<ExamVI>;
        for (const item of this.examList) {
          temp.push(item);
        }
        this.examList = temp.filter(t => t.id !== exam.id);
      } else {
        console.log(x);
        this.msg.error(x.message);
      }
    });
  }

  edit(exam: ExamVI) {
    console.log('edit exam:', exam);
    this.isEditView = true;
    this.editExam = exam;
  }

  cancelEdit() {
    this.isEditView = false;
    this.editExam = null;
  }

  activeExam(exam: ExamVI) {
    console.log(exam);
    exam.status = 1;
    this.ms.storeExam(exam).then(x => {
      if (x.status === 0) {
        this.msg.success('考试开始');
      }
    });
  }

  finishExam(exam: ExamVI) {
    console.log(exam);
    exam.status = 2;
    this.ms.storeExam(exam).then(x => {
      if (x.status === 0) {
        this.msg.success('标记为已考试');
      }
    });
  }

  view(exam: ExamVI) {
    this.detailExam = exam;
    this.ms.loadStudents(exam.number).then(x => {
      if (x.status === 0) {
        this.studentList = x.list;
        this.isDetailView = true;
      }
    });
  }

  cancelDetailView() {
    this.isDetailView = false;
    this.studentList = [];
  }

  formatDate(date: Date | string): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日\
${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`;
  }
}
