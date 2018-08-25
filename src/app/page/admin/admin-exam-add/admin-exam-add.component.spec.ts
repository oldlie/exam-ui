import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExamAddComponent } from './admin-exam-add.component';

describe('AdminExamAddComponent', () => {
  let component: AdminExamAddComponent;
  let fixture: ComponentFixture<AdminExamAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminExamAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExamAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
