import { TestBed } from '@angular/core/testing';

import { JourneyLegService } from './journey-leg.service';

describe('JourneyLegService', () => {
  let service: JourneyLegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JourneyLegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
