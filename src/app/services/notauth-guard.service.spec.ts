import { TestBed } from '@angular/core/testing';

import { NotauthGuardService } from './notauth-guard.service';

describe('NotauthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotauthGuardService = TestBed.get(NotauthGuardService);
    expect(service).toBeTruthy();
  });
});
