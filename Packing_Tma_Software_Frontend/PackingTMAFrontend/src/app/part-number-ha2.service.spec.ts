import { TestBed } from '@angular/core/testing';

import { PartNumberHA2Service } from './part-number-ha2.service';

describe('PartNumberHA2Service', () => {
  let service: PartNumberHA2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartNumberHA2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
