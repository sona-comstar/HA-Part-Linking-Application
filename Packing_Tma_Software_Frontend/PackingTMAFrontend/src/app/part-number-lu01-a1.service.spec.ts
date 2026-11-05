import { TestBed } from '@angular/core/testing';

import { PartNumberLU01A1Service } from './part-number-lu01-a1.service';

describe('PartNumberLU01A1Service', () => {
  let service: PartNumberLU01A1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartNumberLU01A1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
