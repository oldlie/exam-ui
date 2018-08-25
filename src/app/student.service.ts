import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { SimpleResponse } from './ho/simple.response';
import { ExamVI } from './vi/exam.vi';
import { BaseResponse } from './ho/base.response';
import { VerifyStudentRequest } from './ho/verify-student.request';
import { Paper } from './vi/paper.vi';
import { StudentVI } from './vi/student.vi';
import { IdRequest } from './ho/id.request';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private cs: CoreService) { }

  examInfo(): Promise<SimpleResponse<ExamVI>> {
    const url = `${this.cs.Config.apiURI}/student/exam`;
    return this.cs.get(url, null).toPromise().then(x => x as SimpleResponse<ExamVI>);
  }

  verify(request: VerifyStudentRequest): Promise<SimpleResponse<StudentVI>> {
    const url = `${this.cs.Config.apiURI}/student/verify`;
    return this.cs.post(url, request).toPromise().then(x => x as SimpleResponse<StudentVI>);
  }

  paper(request: VerifyStudentRequest): Promise<SimpleResponse<Paper>> {
    const url = `${this.cs.Config.apiURI}/student/paper`;
    return this.cs.get(url, request).toPromise().then(x => x as SimpleResponse<Paper>);
  }

  finish(request: IdRequest): Promise<BaseResponse> {
    const url = `${this.cs.Config.apiURI}/student/finish`;
    return this.cs.post(url, request).toPromise().then(x => x as BaseResponse);
  }
}
