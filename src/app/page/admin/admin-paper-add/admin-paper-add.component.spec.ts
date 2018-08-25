import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaperAddComponent } from './admin-paper-add.component';

describe('AdminPaperAddComponent', () => {
  let component: AdminPaperAddComponent;
  let fixture: ComponentFixture<AdminPaperAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaperAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaperAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
