import { Component, OnInit } from '@angular/core';
import { Paper } from '../../../vi/paper.vi';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../core.service';

@Component({
  selector: 'app-admin-paper-detail',
  templateUrl: './admin-paper-detail.component.html',
  styleUrls: ['./admin-paper-detail.component.css']
})
export class AdminPaperDetailComponent implements OnInit {

  paper: Paper;

  constructor(private ar: ActivatedRoute, private cs: CoreService) { }

  ngOnInit() {
    //  this.commodityId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('detail', this.cs.previewPaper);
    this.paper = this.cs.previewPaper;
  }

}
