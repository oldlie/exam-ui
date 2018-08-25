import { Component, OnInit, Input } from '@angular/core';
import { ExamVI } from '../../../vi/exam.vi';
import { StudentVI } from '../../../vi/student.vi';
import { ManagerService } from '../../../manager.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Paper } from '../../../vi/paper.vi';

@Component({
  selector: 'app-admin-exam-add',
  templateUrl: './admin-exam-add.component.html',
  styleUrls: ['./admin-exam-add.component.css'],
  providers: [
    ManagerService
  ]
})
export class AdminExamAddComponent implements OnInit {

  @Input() exam: ExamVI;
  status = {
    number: { text: '', valid: false },
    start: { text: '', valid: false }
  };
  studentList: Array<StudentVI>;
  newStudent = {
    id: 0,
    name: '',
    number: '',
    examNumber: '',
    flag: 0,
    paperId: 0,
    isFinished: 0
  } as StudentVI;
  isVisible = false;
  studentStatus = {
    name: { text: '', valid: false },
    number: { text: '', valid: false }
  };
  activePaper = [] as Array<Paper>;
  isFixed = false;
  paperId = 0;

  constructor(private ms: ManagerService, private msg: NzMessageService) { }

  ngOnInit() {
    this.studentList = [];
    if (!this.exam) {
      this.exam = {
        id: 0,
        number: '',
        start: new Date(),
        minute: 90,
        checkPaperTime: 3,
        status: 0
      };
    } else {
      this.status.start.valid = true;
      this.status.number.valid = true;
      this.loadStudent();
    }
  }

  onDateTimeChange(date: Date) {
    console.log('Selected Time: ', date);
  }

  onDateTimeOk(date: Date): void {
    if (date === null) {
      this.status.start.valid = false;
      this.status.start.text = 'falied';
      return;
    }
    this.exam.start = date;
    this.status.start.valid = true;
    this.status.start.text = 'success';
  }

  handleNumberChange(event: Event) {
    if (this.exam.number !== '') {
      this.status.number.text = 'success';
      this.status.number.valid = true;
    } else {
      this.status.number.text = 'falied';
      this.status.number.valid = false;
    }
  }

  handleDateChange(event: Event) {
    if (this.exam.start !== null) {
      this.status.start.text = 'success';
      this.status.start.valid = true;
    } else {
      this.status.start.text = 'falied';
      this.status.start.valid = false;
    }
  }

  save() {
    console.log('save');
    console.log(this.status.number.valid);
    console.log(this.status.start.valid);
    if (this.status.number.valid && this.status.start.valid) {
      this.exam.start.setSeconds(0);
      this.ms.storeExam(this.exam).then(x => {
        if (x.status === 0) {
          this.msg.success('已保存');
          this.exam.id = x.id;
        } else {
          this.msg.error('请稍后再试');
          console.log(x);
        }
      });
    }
  }

  loadActivePaper() {
    this.ms.listActivePaper().then(x => {
      console.log('loadActivePaper', x);
      if (x.status === 0) {
        this.isFixed = false;
        this.isVisible = true;
        this.newStudent.name = '';
        this.newStudent.number = '';
        this.newStudent.flag = 0;
        this.activePaper = x.list;
      }
    });
  }

  addStudent() {
    this.loadActivePaper();
  }

  handlStudentNameChange(event: Event) {
    if (this.newStudent.name !== '') {
      this.studentStatus.name.text = 'success';
      this.studentStatus.name.valid = true;
    } else {
      this.studentStatus.name.text = 'falied';
      this.studentStatus.name.valid = false;
    }
  }

  handlStudentNumberChange(event: Event) {
    if (this.newStudent.number !== '') {
      this.studentStatus.number.text = 'success';
      this.studentStatus.number.valid = true;
    } else {
      this.studentStatus.number.text = 'falied';
      this.studentStatus.number.valid = false;
    }
  }

  handleStudentDialogCancel() {
    this.isVisible = false;
  }

  handleStudentDialogOk() {
    if (this.studentStatus.name.valid && this.studentStatus.number.valid) {
      const student = {
        id: 0,
        name: this.newStudent.name,
        number: this.newStudent.number,
        examNumber: this.exam.number,
        flag: this.isFixed ? 1 : 0,
        paperId: this.paperId,
        isFinished: 0
      };
      this.ms.storeStudent(student).then(x => {
        if (x.status === 0) {
          this.msg.success('已保存考生信息');
          student.id = x.id;
          const temp = [] as Array<StudentVI>;
          this.studentList.forEach(s => temp.push(s));
          console.log(this.studentList);
          temp.push(student);
          this.studentList = temp.sort((a, b) => a.id - b.id);
          console.log('student list', this.studentList);
          // this.loadStudent();
        } else {
          console.log(x);
        }
        this.isVisible = false;
      });
    }
  }

  loadStudent() {
    this.ms.loadStudents(this.exam.number).then(x => {
      if (x.status === 0) {
        this.studentList = x.list;
      }
    });
  }

  deleteStudent(student: StudentVI) {
    this.ms.deleteStudent(student.id).then(
      x => {
        if (x.status === 0) {
          const temp = [] as Array<StudentVI>;
          for (const item of this.studentList) {
            temp.push(item);
          }
          this.studentList = temp.filter(t => t.id !== student.id);
        } else {
          console.log(x);
        }
      }
    );
  }
}
