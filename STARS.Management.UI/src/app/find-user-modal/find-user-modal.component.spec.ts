import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindUserModalComponent } from './find-user-modal.component';

describe('FindUserModalComponent', () => {
  let component: FindUserModalComponent;
  let fixture: ComponentFixture<FindUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindUserModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
