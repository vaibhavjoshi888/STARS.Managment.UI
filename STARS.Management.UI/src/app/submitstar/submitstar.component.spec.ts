import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitstarComponent } from './submitstar.component';

describe('SubmitstarComponent', () => {
  let component: SubmitstarComponent;
  let fixture: ComponentFixture<SubmitstarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitstarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitstarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
