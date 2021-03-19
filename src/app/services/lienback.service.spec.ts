import { TestBed } from '@angular/core/testing';

import { LienbackService } from './lienback.service';

describe('LienbackService', () => {
  let service: LienbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LienbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
