import { TestBed, async, inject } from '@angular/core/testing';

import { IsManagerGuard } from './is-manager.guard';

describe('IsManagerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsManagerGuard]
    });
  });

  it('should ...', inject([IsManagerGuard], (guard: IsManagerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
