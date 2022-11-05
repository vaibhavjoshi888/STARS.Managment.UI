import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallstarsComponent } from './viewallstars.component';

describe('ViewallstarsComponent', () => {
  let component: ViewallstarsComponent;
  let fixture: ComponentFixture<ViewallstarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewallstarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewallstarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
