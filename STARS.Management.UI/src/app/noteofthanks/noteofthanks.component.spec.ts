import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteofthanksComponent } from './noteofthanks.component';

describe('NoteofthanksComponent', () => {
  let component: NoteofthanksComponent;
  let fixture: ComponentFixture<NoteofthanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteofthanksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteofthanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
