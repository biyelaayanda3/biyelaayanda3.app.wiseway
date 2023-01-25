import { TestBed } from '@angular/core/testing';

import { AdvancedCertificatesService } from './advanced-certificates.service';

describe('AdvancedCertificatesService', () => {
  let service: AdvancedCertificatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvancedCertificatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
