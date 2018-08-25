import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { BaseResponse } from './ho/base.response';
import { PageResponse } from './ho/page.response';
import { Paper } from './vi/paper.vi';
import { ExamVI } from './vi/exam.vi';
import { StudentVI } from './vi/student.vi';
import { ListResponse } from './ho/list.response';
import { IdResponse } from './ho/id.response';

@Injectable()
export class ManagerService {

  constructor(private cs: CoreService) { }

  loadAllPapers(): Promise<PageResponse<Paper>> {
    const page = 0;
    const size = 100;
    const orderBy = 'id';
    const order = 1;
    const url = `${this.cs.Config.apiURI}/admin/paper`;
    return this.cs.get(url, {
      page: page, size: size, orderBy: orderBy, order: order
    }).toPromise().then(x => x as PageResponse<Paper>);
  }

  storePaper(paper: Paper): Promise<BaseResponse> {
    const url = `${this.cs.Config.apiURI}/admin/paper`;
    return this.cs.post(url, paper).toPromise().then(x => x as BaseResponse);
  }

  deletePaper(id: number): Promise<BaseResponse> {
    const url = `${this.cs.Config.apiURI}/admin/paper`;
    return this.cs.delete(url, { id: id }).toPromise().then(x => x as BaseResponse);
  }

  storeExam(exam: ExamVI): Promise<IdResponse> {
    const url = `${this.cs.Config.apiURI}/admin/exam`;
    return this.cs.post(url, exam).toPromise().then(x => x as IdResponse);
  }

  deleteExam(id: number): Promise<BaseResponse> {
    const url = `${this.cs.Config.apiURI}/admin/exam`;
    return this.cs.delete(url, { id: id }).toPromise().then(x => x as BaseResponse);
  }

  pageExam(page: number): Promise<PageResponse<ExamVI>> {
    const url = `${this.cs.Config.apiURI}/admin/exam`;
    return this.cs.get(url, { page: page, size: 20, orderBy: 'id', order: 1 }).toPromise().then(x => x as PageResponse<ExamVI>);
  }

  listActivePaper(): Promise<ListResponse<Paper>> {
    const url = `${this.cs.Config.apiURI}/admin/exam/paper`;
    return this.cs.get(url, null).toPromise().then(x => x as ListResponse<Paper>);
  }

  storeStudent(student: StudentVI): Promise<IdResponse> {
    const url = `${this.cs.Config.apiURI}/admin/student`;
    return this.cs.post(url, {
      id: student.id,
      name: student.name,
      number: student.number,
      examNumber: student.examNumber,
      flag: student.flag ? 1 : 0,
      paperId: student.paperId,
      isFinished: 0
    }).toPromise().then(x => x as IdResponse);
  }

  deleteStudent(id: number): Promise<BaseResponse> {
    const url = `${this.cs.Config.apiURI}/admin/student`;
    return this.cs.delete(url, { id: id }).toPromise().then(x => x as BaseResponse);
  }

  loadStudents(number: string): Promise<ListResponse<StudentVI>> {
    const url = `${this.cs.Config.apiURI}/admin/student/exam`;
    return this.cs.get(url, {number: number}).toPromise().then(x => x as ListResponse<StudentVI>);
  }

  password(password: string): Promise<BaseResponse> {
    const url = `${this.cs.Config.apiURI}/admin/password`;
    return this.cs.post(url, {account: this.cs.LoginInfo.account, password: password}).toPromise().then(x => x as BaseResponse);
  }
}
