import { TestBed } from '@angular/core/testing';

import { BComService } from './b-com.service';

describe('BComService', () => {
  let service: BComService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BComService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
