import { Component, OnInit } from '@angular/core';
import { Paper } from '../../../vi/paper.vi';
import { ManagerService } from '../../../manager.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { CoreService } from '../../../core.service';

@Component({
  selector: 'app-admin-paper',
  templateUrl: './admin-paper.component.html',
  styleUrls: ['./admin-paper.component.css'],
  providers: [
    ManagerService
  ]
})
export class AdminPaperComponent implements OnInit {

  papers: Array<Paper>;
  isEditModel = false;
  editPaper: Paper;

  constructor(private cs: CoreService, private ms: ManagerService, private msg: NzMessageService, private r: Router) { }

  ngOnInit() {
    this.load();
  }

  delete(paper: Paper) {
    this.ms.deletePaper(paper.id).then(x => {
      if (x.status === 0) {
        const temp = this.papers.filter(y => y.id !== paper.id);
        this.papers = temp;
      } else {
        this.msg.error('暂时不能删除，请稍后再试');
      }
    });
  }

  load() {
    this.ms.loadAllPapers().then(x => {
      if (x.status === 0) {
        this.papers = x.list;
      } else {
        this.msg.error('暂时没有加载到数据，请稍后再试');
      }
    });
  }

  edit(paper: Paper) {
    this.editPaper = paper;
    this.isEditModel = true;
  }

  cancelEdit() {
    this.editPaper = null;
    this.isEditModel = false;
  }

  preview(paper: Paper) {
    this.cs.previewPaper = paper;
    console.log('preview', this.cs.previewPaper);
    this.r.navigate(['/admin/paper/preview']).catch(excp => console.log(excp));
  }

  inactive(paper: Paper) {
    paper.status = 0;
    this.ms.storePaper(paper).then(x => {
      if (x.status === 0) {
        this.msg.success('已修改');
      } else {
        this.msg.error(x.message);
      }
    });
  }

  active(paper: Paper) {
    paper.status = 1;
    this.ms.storePaper(paper).then(x => {
      if (x.status === 0) {
        this.msg.success('已修改');
      } else {
        this.msg.error(x.message);
      }
    });
  }
}
