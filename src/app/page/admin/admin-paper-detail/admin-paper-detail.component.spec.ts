import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaperDetailComponent } from './admin-paper-detail.component';

describe('AdminPaperDetailComponent', () => {
  let component: AdminPaperDetailComponent;
  let fixture: ComponentFixture<AdminPaperDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaperDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaperDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
