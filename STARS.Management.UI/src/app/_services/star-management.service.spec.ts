import { TestBed } from '@angular/core/testing';

import { StarManagementService } from './star-management.service';

describe('StarManagementService', () => {
  let service: StarManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
