import { TestBed } from '@angular/core/testing';

import { OnlineCertificatesService } from './online-certificates.service';

describe('OnlineCertificatesService', () => {
  let service: OnlineCertificatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineCertificatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
