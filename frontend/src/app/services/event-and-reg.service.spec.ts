import { TestBed } from '@angular/core/testing';

import { EventAndRegService } from './event-and-reg.service';

describe('EventAndRegService', () => {
  let service: EventAndRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventAndRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
