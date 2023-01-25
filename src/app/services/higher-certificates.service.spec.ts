import { TestBed } from '@angular/core/testing';

import { HigherCertificatesService } from './higher-certificates.service';

describe('HigherCertificatesService', () => {
  let service: HigherCertificatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HigherCertificatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
