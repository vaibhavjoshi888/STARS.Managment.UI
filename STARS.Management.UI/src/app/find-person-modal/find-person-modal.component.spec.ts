import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPersonModalComponent } from './find-person-modal.component';

describe('FindPersonModalComponent', () => {
  let component: FindPersonModalComponent;
  let fixture: ComponentFixture<FindPersonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindPersonModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPersonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
