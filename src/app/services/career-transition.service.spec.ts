import { TestBed } from '@angular/core/testing';

import { CareerTransitionService } from './career-transition.service';

describe('CareerTransitionService', () => {
  let service: CareerTransitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareerTransitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
