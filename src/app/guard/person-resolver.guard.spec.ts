import { TestBed } from '@angular/core/testing';

import { PersonResolverGuard } from './person-resolver.guard';

describe('PersonResolverGuard', () => {
  let guard: PersonResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PersonResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
