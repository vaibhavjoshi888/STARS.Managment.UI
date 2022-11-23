import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyModalComponent } from './deny-modal.component';

describe('DenyModalComponent', () => {
  let component: DenyModalComponent;
  let fixture: ComponentFixture<DenyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
