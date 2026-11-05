import { TestBed } from '@angular/core/testing';

import { ZebraPrintServiceService } from './zebra-print-service.service';

describe('ZebraPrintServiceService', () => {
  let service: ZebraPrintServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZebraPrintServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
