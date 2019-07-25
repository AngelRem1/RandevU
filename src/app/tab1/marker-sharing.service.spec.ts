import { TestBed } from '@angular/core/testing';

import { MarkerSharingService } from './marker-sharing.service';

describe('MarkerSharingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarkerSharingService = TestBed.get(MarkerSharingService);
    expect(service).toBeTruthy();
  });
});
