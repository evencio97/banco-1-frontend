import { TestBed } from '@angular/core/testing';

import { TransfersService } from './transfers.service';

describe('TransfersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransfersService = TestBed.get(TransfersService);
    expect(service).toBeTruthy();
  });
});
