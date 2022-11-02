import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchusermodalComponent } from './searchusermodal.component';

describe('SearchusermodalComponent', () => {
  let component: SearchusermodalComponent;
  let fixture: ComponentFixture<SearchusermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchusermodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchusermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
